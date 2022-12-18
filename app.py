from flask import Flask, render_template,request,flash,redirect,url_for,session
import pickle
import requests
import math
import sqlite3
import folium 

app = Flask(__name__)
app.secret_key="123"
model=pickle.load(open('model.pkl','rb'))

con=sqlite3.connect('database.db')
con.execute("create table if not exists farmer(pid integer primary key,name text,city text,contact text,password text)")
con.close()

@app.route("/")
def index():
    return render_template('Visit.html')

@app.route("/home")
def home():
    return render_template('homePage.html')

@app.route("/aboutus")
def about():
    return render_template('About.html')

@app.route("/contactus")
def contact():
    return render_template('Contact.html')
 
@app.route("/home", methods=['POST'])
def do_the_math():
    global location
    location = request.form.get('loc')
    soil_type = int(request.form.get('soil_type'))
    crop_type = int(request.form.get('crop_type'))
    nitrogen = int(request.form.get('N'))
    phosphorus = int(request.form.get('P'))
    potassium = int(request.form.get('K'))
    moist = int(request.form.get('moist'))
    Weather_obj = fetch_weather(location)
    # open_street_map(Weather_obj)
    if(Weather_obj == 'NOT_FOUND'):
        return render_template('homePage.html', result="Invalid City. Please Retry!")
    temperature = Weather_obj['temp']
    humidity = Weather_obj['humidity']
    
    input = [temperature, humidity, moist, soil_type, crop_type, nitrogen, potassium, phosphorus]
    print(input)
    output = model.predict([input])
    print(output)
    return render_template('homePage.html', result='Use '+output[0]+' for higher product yields!!')


def fetch_weather(location):
    api_key = '22d868531e87d24cfd8b74475a775899'
    url = f"https://api.openweathermap.org/data/2.5/weather?q={location}&appid={api_key}"

    response = requests.get(url).json()
    if(response['cod'] == '404'):
        return "NOT_FOUND"
    temp = response['main']['temp']
    temp = math.floor(temp-273.15)  # Convert to °C
    humidity = response['main']['humidity']
    lat = response['coord']['lat']
    lon = response['coord']['lon']
    return {
        'temp': temp,
        'humidity': humidity,
        'lat': lat,
        'lon': lon
    }


@app.route("/openStreetMap")
def open_street_map():
    # this map using stamen toner
    #location = request.form.get('loc')
    Weather_obj = fetch_weather(location)
    latitude = Weather_obj['lat']
    longitude = Weather_obj['lon']
    print(latitude)
    print(longitude)
    markers={
   'lat':latitude,
   'lon':longitude,
   'popup': location
    }
    map = folium.Map(
        location=[markers['lat'],markers['lon']],
        #tiles='Stamen Toner',
        zoom_start=13
    )

    folium.Marker(
        location=[markers['lat'],markers['lon']],
        popup=markers['popup'],
        tooltip="Click Here!"
    ).add_to(map)
    
    return map._repr_html_()

@app.route('/login',methods=["GET","POST"])
def login():
    if request.method=='POST':
        contact=request.form['contact']
        password=request.form['password']
        con=sqlite3.connect("database.db")
        con.row_factory=sqlite3.Row
        cur=con.cursor()
        cur.execute("select * from farmer where contact=? and password=?",(contact,password))
        data=cur.fetchone()

        if data:
            session["contact"]=data["contact"]
            session["password"]=data["password"]
            return redirect("home")
        else:
            flash("Username and Password Mismatch","danger")
    return render_template('login.html')

@app.route('/register',methods=['GET','POST'])
def register():
    if request.method=='POST':
        try:
            name=request.form['name']
            city=request.form['city']
            contact=request.form['contact']
            password=request.form['password']
            con=sqlite3.connect("database.db")
            cur=con.cursor()
            cur.execute("insert into farmer(name,city,contact,password)values(?,?,?,?)",(name,city,contact,password))
            con.commit()
            flash("Record Added  Successfully","success")
        except:
            flash("Error in Insert Operation","danger")
        finally:
            return redirect('login')
            con.close()

    return render_template('register.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
