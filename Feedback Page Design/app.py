from flask import Flask
from flask import Flask, render_template,request,flash,redirect,url_for,session
import pickle
import math
import sqlite3




app = Flask(__name__)


con=sqlite3.connect('feedback.db')
con.execute("create table if not exists userFeedback(crop text,fertilizer text,soil text,date text,city text, cropArea real, Yeild real, note text)")
con.close()



@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route("/contactus", methods=["GET","POST"])
def contact():
    # con=sqlite3.connect("feedback.db")
    # cur=con.cursor()
    # cur.execute("select date from userFeedback order by (select cropArea/Yeild as avgYeild) DESC, date DESC") 
    # con.commit()
    
    if request.method=='POST':
        try:
            crop=request.form['crop']
            fertilizer = request.form['fertilizer']
            soil = request.form['soil']
            date = request.form['date']
            city=request.form['city']
            cropArea=request.form['cropArea']
            yeild=request.form['yeild']
            note = request.form['note']
            con=sqlite3.connect("feedback.db")
            cur=con.cursor()
            cur.execute("insert into userFeedback(crop, fertilizer, soil, date, city, cropArea, yeild, note)values(?,?,?,?,?,?,?,?)",(crop, fertilizer, soil, date, city, cropArea, yeild, note))
            con.commit()
            cur.execute("select date from userFeedback order by (select cropArea/Yeild as avgYeild) DESC, date DESC") 
            con.commit()
            flash("Record Added  Successfully","success")
        except:
            flash("Error in Insert Operation","danger")
        finally:
            return redirect('contactus')
        
        con.close()
            
    return render_template('FeedbackPage.html')



if __name__ == "__main__":
    app.run(debug=True)
    
    #  app.run(debug=True, port = 8000)