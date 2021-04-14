import feedparser as fp
import newspaper
from newspaper import Article

from time import mktime
from datetime import datetime

import pymysql.cursors





class Crawler:
    def __init__(self, config={}):
        self.websites = {'bbc': 'http://feeds.bbci.co.uk/news/rss.xml', 
                         'cnn': 'http://rss.cnn.com/rss/edition.rss',
                         'fox': 'http://feeds.foxnews.com/foxnews/latest'}
        self.name = 'fox'
        self.root_url = self.websites[self.name]

    def get_news(self, limit):
        self.response = fp.parse(self.root_url)
        count = 1
        news = []
        print(len(self.response.entries))
        for entry in self.response.entries:
            if not hasattr(entry, 'published'):
                continue
            if count > limit:
                break
            article = {}
            article['link'] = entry.link
            date = entry.published_parsed
            article['published'] = datetime.fromtimestamp(mktime(date)).isoformat()

            try:
                content = Article(entry.link)
                content.download()
                content.parse()
            except Exception as err:
                print(err)
                continue
            if content.title == 'Error':
                continue
            article['title'] = content.title
            article['text'] = content.text
            article['authors'] = content.authors
            count += 1
            news.append(article)
        
        return news


connection = pymysql.connect(host='headlinr.ceyqwsm3r2jw.us-east-1.rds.amazonaws.com',
                            user='masterUsername',
                            password='password',
                            db='headlinr',
                            charset='utf8mb4',
                            cursorclass=pymysql.cursors.DictCursor)

cursor = connection.cursor()


c = Crawler()
news = c.get_news(4)
for n in news:
   # print("--------------------------------------------")
   # print("whole article: ", n['text'])
   # print("--------------------------------------------")
   content = n['text']
   extract = content.split("\n\n")[0:8]
   snippet = ''.join(extract)
   # print("Snippet: ", snippet)
   query = "INSERT INTO `news` (`url`,`snippet`,`tag`,`title`) VALUES (%s, %s, %s,%s)"
   cursor.execute(query, (n['link'], snippet, "NONE", n['title']))
   # print("success")

connection.commit()

connection.close()
