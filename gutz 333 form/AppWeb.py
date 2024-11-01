from flask import render_template, Flask, request
import pyodbc as sqlServer

app = Flask(__name__)

data_connection = (
r"Driver={ODBC Driver 17 for SQL Server};"
r"Server=GUTZ333\ATIVIDADESSQL;"  
"Database=GUTZ333;"
"Trusted_Connection=yes;"
)

connect = sqlServer.connect(data_connection)
query = connect.cursor()

@app.route('/')
def home():
    return render_template('login&register.html')

@app.route('/submitRegister', methods=['POST'])
def submitData():
    name = request.form.get('userName')
    email = request.form.get('Email')
    password = request.form.get('Password')
    number_phone = request.form.get('numberPhone')

    command_sql = f"""
    INSERT INTO register_users
    values('{name}', HASHBYTES('SHA2_256', '{password}'), '{email}', '{number_phone}')
    """
    query.execute(command_sql)
    connect.commit()
    connect.close()

    return render_template('formSubmit.html')

if __name__ == '__main__':
    app.run(debug=True)