from flask import Flask, render_template, request, jsonify, make_response
# import os
# import uuid
import pymysql
import jwt
import datetime
from functools import wraps



app = Flask(__name__)
#
connection = pymysql.connect(host='headlinr.ceyqwsm3r2jw.us-east-1.rds.amazonaws.com', 
                             user='masterUsername', 
                             password='password', 
                             db='headlinr', 
                             charset='utf8mb4', 
                             cursorclass=pymysql.cursors.DictCursor) 

app.config['SECRET_KEY'] = 'thisisarandomsecretkeyblahblahblah'


def login_required(f):
    @wraps(f)
    def dec(*args, **kwargs):
        token = request.args.get('token')

        # If token is not provided
        if not token: 
            return jsonify({'message' : 'Token is missing !!'}), 401
   
        try: 
            # decoding the payload to fetch the stored details 
            data = jwt.decode(token, app.config['SECRET_KEY']) 
            current_user = data['user'] 
        except: 
            return jsonify({ 
                'message' : 'Token is invalid !!'
            }), 401
        # returns the current logged in users contex to the routes 
        return  f(current_user, *args, **kwargs)
    return dec

@app.route("/login")
def login():
    return "login"

@app.route("/api/loginAuth", methods = ['POST'])
def loginAuth():
    data = request.get_json()
    username = data['username']
    password = data['password']

    with connection.cursor() as cursor:
        query = 'SELECT * FROM user WHERE username = %s AND password = %s'
        cursor.execute(query,(username,password))
    #fetch one line
    user = cursor.fetchone()
    print(user)

    if not user:
        # abort(500)
        return make_response(jsonify({'message': 'Username password combination not recognized'}), 500, '')
    token = jwt.encode({'user': username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=1440)}, app.config['SECRET_KEY'])
    response = {'status': 200, 'message': 'success', 'token': token.decode('UTF-8')}
    # return jsonify(response)
    return make_response(jsonify(response))



@app.route("/register")
def register():
    return "register"

@app.route("/api/registerAuth", methods = ['POST'])
def registerAuth():
    data = request.get_json()
    username = data['username']
    password = data['password']

    try:
        with connection.cursor() as cursor:
            query = "INSERT INTO user (username, password) VALUES (%s, %s)"
            cursor.execute(query, (username, password))
            connection.commit()
    except pymysql.err.IntegrityError:
        return make_response(jsonify({'message': 'User already exists'}), 500)
    token = jwt.encode({'user': username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=1440)}, app.config['SECRET_KEY'])
    response = {'status': 200, 'message': 'success', 'token': token.decode('UTF-8')}
    return jsonify(response)


#showing all the likes for a given news
@app.route("/like", methods = ['GET'])
@login_required
def viewlike(user):
    #request the news id form the front end
   newsID = request.args.get('newsID')
   print(user)
   query = ''
   with connection.cursor() as cursor:
       cursor.execute(query,newsID)
   likes = cursor.fetchall()
   #send all likes to the front end
   return render_template('likes.html', likes = likes)





@app.route("/api/viewnews")
def viewNews():
    #select the genre of news
    if not len(request.args):
        print("nor arg")
        query = "SELECT * FROM news"
        with connection.cursor() as cursor:
            cursor.execute(query, [])
        data = cursor.fetchall()
    if request.args.get("NewsId"):
        newsId = request.args.get("NewsId")
        function = request.args.get("function")
        if function == "like":
            query = "INSERT INTO Liked (username, photoID) ....VALUES ...."
            cursor.execute(query, (newsId, 'masterUsername'))
        if function == "viewmore":
            query = "SELECT LINK FROM NEW WHERE ..."
            cursor.execute(query, (newsId, 'masterUsername'))
            link = cursor.fetchone
            return  render_template("/viewnews", website = link)
        else:
            query = "SELECT * FROM news WHERE news_id = %s"
            with connection.cursor() as cursor:
                cursor.execute(query, [newsId])
            data = cursor.fetchone()

    return jsonify(data)

# @app.route("/search")
# def searchNews():
#     query = "SELECT * FROM NEWS ...."
#
#     return None








@app.route("/")
def home():
    return "helloworld"


@app.route("/logout", methods = ['GET'])
def logout():
    session.pop('username')
    return redirect('/')
