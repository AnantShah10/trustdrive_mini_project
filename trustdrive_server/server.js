const express = require("express");
const cors = require("cors");
const pool = require("./database.js");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/admin/register", (request, response) => {
    
    const admin_name = request.body["admin_name"];
    const registered_admin_password = request.body["registered_admin_password"];
    const new_admin_password = request.body["new_admin_password"];
    const confirm_new_admin_password = request.body["confirm_new_admin_password"];
    var flag = 0;
    
    if ( /^[a-zA-Z]*$/.test(admin_name) && admin_name.length >= 3 ) {
        flag += 0;
    }
    else {
        flag += 1;
    }

    if ( /^[a-zA-Z0-9]*$/.test(new_admin_password) && new_admin_password.length >= 10 ) {
        flag += 0;
    }
    else {
        flag += 1;
    }

    if ( new_admin_password == confirm_new_admin_password ) {
        flag += 0;
    }
    else {
        flag += 1;
    }

    const select_statement = `SELECT new_admin_password FROM admin;`; 

    pool.query(select_statement).then((sql_response) => {
        for (let count = 0; count < sql_response.rowCount; count++) {
            if (sql_response.rows[count].new_admin_password == registered_admin_password) {
                flag += 0;
            }          
        }
    })

    if (flag == 0) {
        const insert_statement = `INSERT INTO admin ( admin_name, new_admin_password ) VALUES ('${admin_name}', '${new_admin_password}');`;
        
        pool.query(insert_statement).then((response) => {
            console.log("Data Saved");
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })

        response.send("Response Recieved: " + request.body);
    }
    else {
        response.status(400).send({
            message: 'Please Re-Enter Correct Information!'
        });
    }
})

app.post("/admin/login", (request, response) => {
    const admin_name = request.body["admin_name"];
    const new_admin_password = request.body["new_admin_password"];
    
    const select_statement = `SELECT admin_name, new_admin_password FROM admin;`; 

    var flag = 0;

    pool.query(select_statement).then((sql_response) => {
        for (let count = 0; count < sql_response.rowCount; count++) {
            if (sql_response.rows[count].admin_name == admin_name && sql_response.rows[count].new_admin_password == new_admin_password) {
                flag = 1;
            }          
        }

        if (flag == 1) {
            console.log("Data Extracted");
            console.log(response);
            response.send("Response Recieved: " + request.body);
        }
        else {
            response.status(400).send({
                message: 'Please Re-Enter Valid Information!'
            });
        }
    })
    .catch((error) => {
        console.log('Error', error);
    })
})

app.post("/user/register", (request, response) => {
    
    const user_name = request.body["user_name"];
    const user_email = request.body["user_email"];
    const aadhar_number = request.body["aadhar_number"];
    const user_phone_number = request.body["user_phone_number"];
    const user_password = request.body["user_password"];
    const confirm_user_password = request.body["confirm_user_password"];
    var flag = 0;
    
    if ( /^[a-zA-Z]*$/.test(user_name) && user_name.length >= 3 ) {
        flag += 0;
    }
    else {
        flag += 1;
    }

    if ( /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(user_email) ) {
        flag += 0;
    }
    else {
        flag += 1;
    }

    if ( /^[0-9]*$/.test(aadhar_number) && aadhar_number.length == 12 && /^[0-9]*$/.test(user_phone_number) && user_phone_number.length == 10 && /^[a-zA-Z0-9]*$/.test(user_password) && user_password.length >= 10 ) {
        flag += 0;
    }
    else {
        flag += 1;
    }

    if ( user_password == confirm_user_password ) {
        flag += 0;
    }
    else {
        flag += 1;
    }

    if (flag == 0) {
        const insert_statement = `INSERT INTO client ( user_name, user_email, aadhar_number, user_phone_number, user_password ) VALUES ('${user_name}', '${user_email}', '${aadhar_number}', '${user_phone_number}', '${user_password}');`;
        
        pool.query(insert_statement).then((response) => {
            console.log("Data Saved");
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })

        response.send("Response Recieved: " + request.body);
    }
    else {
        response.status(400).send({
            message: 'Please Re-Enter Correct Information!'
        });
    }
})

app.post("/user/login", (request, response) => {
    const aadhar_number = request.body["aadhar_number"];
    const user_password = request.body["user_password"];
    
    const select_statement = `SELECT aadhar_number, user_password FROM client;`; 

    var flag = 0;

    pool.query(select_statement).then((sql_response) => {
        for (let count = 0; count < sql_response.rowCount; count++) {
            if (sql_response.rows[count].aadhar_number == aadhar_number && sql_response.rows[count].user_password == user_password) {
                flag = 1;
            }          
        }

        if (flag == 1) {
            console.log("Data Extracted");
            console.log(response);
            response.send("Response Recieved: " + request.body);
        }
        else {
            response.status(400).send({
                message: 'Please Re-Enter Valid Information!'
            });
        }
    })
    .catch((error) => {
        console.log('Error', error);
    })
})

app.post("/manufacturer/register", (request, response) => {
    
    const manufacturer_name = request.body["manufacturer_name"];
    const manufacturer_email = request.body["manufacturer_email"];
    const company_name = request.body["company_name"];
    const company_origin = request.body["company_origin"];
    const license_number = request.body["license_number"];
    const license_year = request.body["license_year"];
    const manufacturer_password = request.body["manufacturer_password"];
    const confirm_manufacturer_password = request.body["confirm_manufacturer_password"];
    var flag = 0;
    
    if ( /^[a-zA-Z\s]*$/.test(manufacturer_name) && manufacturer_name.length >= 3 && /^[a-zA-Z\s]*$/.test(company_name) && company_name.length >= 3 && /^[a-zA-Z\s]*$/.test(company_origin) && company_origin.length >= 3 ) {
        flag += 0;
    }
    else {
        flag += 1;
    }

    if ( /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(manufacturer_email) ) {
        flag += 0;
    }
    else {
        flag += 1;
    }

    if ( /^[a-zA-Z0-9]*$/.test(license_number) && license_number.length == 21 && /^[0-9]*$/.test(license_year) && license_year.length == 4 && /^[a-zA-Z0-9]*$/.test(manufacturer_password) && manufacturer_password.length >= 10 ) {
        flag += 0;
    }
    else {
        flag += 1;
    }

    if ( manufacturer_password == confirm_manufacturer_password ) {
        flag += 0;
    }
    else {
        flag += 1;
    }

    if (flag == 0) {
        const insert_statement = `INSERT INTO manufacturer ( manufacturer_name, manufacturer_email, company_name, company_origin, license_number, license_year, manufacturer_password ) VALUES ('${manufacturer_name}', '${manufacturer_email}', '${company_name}', '${company_origin}', '${license_number}', '${license_year}', '${manufacturer_password}');`;
        
        pool.query(insert_statement).then((response) => {
            console.log("Data Saved");
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })

        response.send("Response Recieved: " + request.body);
    }
    else {
        response.status(400).send({
            message: 'Please Re-Enter Correct Information!'
        });
    }
})

app.post("/manufacturer/login", (request, response) => {
    const license_number = request.body["license_number"];
    const manufacturer_password = request.body["manufacturer_password"];
    
    const select_statement = `SELECT license_number, manufacturer_password, manufacturer_name FROM manufacturer;`; 

    var flag = 0;

    pool.query(select_statement).then((sql_response) => {
        let m_name = "";
        for (let count = 0; count < sql_response.rowCount; count++) {
            if (sql_response.rows[count].license_number == license_number && sql_response.rows[count].manufacturer_password == manufacturer_password) {
                m_name = sql_response.rows[count].manufacturer_name;
                flag = 1;
            }          
        }

        if (flag == 1) {
            console.log("Data Extracted");
            console.log(response);
            response.send({name: m_name});
        }
        else {
            response.status(400).send({
                message: 'Please Re-Enter Valid Information!'
            });
        }
    })
    .catch((error) => {
        console.log('Error', error);
    })
})

app.post("/transporter/register", (request, response) => {
    
    const transporter_name = request.body["transporter_name"];
    const transporter_email = request.body["transporter_email"];
    const company_name = request.body["company_name"];
    const mode_of_transportation = request.body["mode_of_transportation"];
    const license_number = request.body["license_number"];
    const license_year = request.body["license_year"];
    const transporter_password = request.body["transporter_password"];
    const confirm_transporter_password = request.body["confirm_transporter_password"];
    var flag = 0;
    
    if ( /^[a-zA-Z\s]*$/.test(transporter_name) && transporter_name.length >= 3 && /^[a-zA-Z\s]*$/.test(company_name) && company_name.length >= 3 && /^[a-zA-Z\s]*$/.test(mode_of_transportation) && mode_of_transportation.length >= 3 ) {
        flag += 0;
    }
    else {
        flag += 1;
    }

    if ( /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(transporter_email) ) {
        flag += 0;
    }
    else {
        flag += 1;
    }

    if ( /^[a-zA-Z0-9]*$/.test(license_number) && license_number.length == 21 && /^[0-9]*$/.test(license_year) && license_year.length == 4 && /^[a-zA-Z0-9]*$/.test(transporter_password) && transporter_password.length >= 10 ) {
        flag += 0;
    }
    else {
        flag += 1;
    }

    if ( transporter_password == confirm_transporter_password ) {
        flag += 0;
    }
    else {
        flag += 1;
    }

    if (flag == 0) {
        const insert_statement = `INSERT INTO transporter ( transporter_name, transporter_email, company_name, mode_of_transportation, license_number, license_year, transporter_password ) VALUES ('${transporter_name}', '${transporter_email}', '${company_name}', '${mode_of_transportation}', '${license_number}', '${license_year}', '${transporter_password}');`;
        
        pool.query(insert_statement).then((response) => {
            console.log("Data Saved");
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })

        response.send("Response Recieved: " + request.body);
    }
    else {
        response.status(400).send({
            message: 'Please Re-Enter Correct Information!'
        });
    }
})

app.post("/transporter/login", (request, response) => {
    const license_number = request.body["license_number"];
    const transporter_password = request.body["transporter_password"];
    
    const select_statement = `SELECT license_number, transporter_password, transporter_name FROM transporter;`; 

    var flag = 0;

    pool.query(select_statement).then((sql_response) => {
        let t_name = "";
        for (let count = 0; count < sql_response.rowCount; count++) {
            if (sql_response.rows[count].license_number == license_number && sql_response.rows[count].transporter_password == transporter_password) {
                t_name = sql_response.rows[count].transporter_name;
                flag = 1;
            }          
        }

        if (flag == 1) {
            console.log("Data Extracted");
            console.log(response);
            response.send({name: t_name});
        }
        else {
            response.status(400).send({
                message: 'Please Re-Enter Valid Information!'
            });
        }
    })
    .catch((error) => {
        console.log('Error', error);
    })
})

app.post("/distributor/register", (request, response) => {
    
    const distributor_name = request.body["distributor_name"];
    const distributor_email = request.body["distributor_email"];
    const company_name = request.body["company_name"];
    const gst_number = request.body["gst_number"];
    const distributor_password = request.body["distributor_password"];
    const confirm_distributor_password = request.body["confirm_distributor_password"];
    var flag = 0;
    
    if ( /^[a-zA-Z\s]*$/.test(distributor_name) && distributor_name.length >= 3 && /^[a-zA-Z\s]*$/.test(company_name) && company_name.length >= 3 ) {
        flag += 0;
    }
    else {
        flag += 1;
    }

    if ( /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(distributor_email) ) {
        flag += 0;
    }
    else {
        flag += 1;
    }

    if ( /^[a-zA-Z0-9]*$/.test(gst_number) && gst_number.length == 15 && /^[a-zA-Z0-9]*$/.test(distributor_password) && distributor_password.length >= 10 ) {
        flag += 0;
    }
    else {
        flag += 1;
    }

    if ( distributor_password == confirm_distributor_password ) {
        flag += 0;
    }
    else {
        flag += 1;
    }

    if (flag == 0) {
        const insert_statement = `INSERT INTO distributor ( distributor_name, distributor_email, company_name, gst_number, distributor_password ) VALUES ('${distributor_name}', '${distributor_email}', '${company_name}', '${gst_number}', '${distributor_password}');`;
        
        pool.query(insert_statement).then((response) => {
            console.log("Data Saved");
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })

        response.send("Response Recieved: " + request.body);
    }
    else {
        response.status(400).send({
            message: 'Please Re-Enter Correct Information!'
        });
    }
})

app.post("/distributor/login", (request, response) => {
    const gst_number = request.body["gst_number"];
    const distributor_password = request.body["distributor_password"];
    
    const select_statement = `SELECT gst_number, distributor_password, distributor_name FROM distributor;`; 

    var flag = 0;

    pool.query(select_statement).then((sql_response) => {
        d_name = "";
        for (let count = 0; count < sql_response.rowCount; count++) {
            if (sql_response.rows[count].gst_number == gst_number && sql_response.rows[count].distributor_password == distributor_password) {
                d_name = sql_response.rows[count].distributor_name;
                flag = 1;
            }          
        }

        if (flag == 1) {
            console.log("Data Extracted");
            console.log(response);
            response.send({name: d_name});
        }
        else {
            response.status(400).send({
                message: 'Please Re-Enter Valid Information!'
            });
        }
    })
    .catch((error) => {
        console.log('Error', error);
    })
})

app.post("/vendor/register", (request, response) => {
    
    const vendor_name = request.body["vendor_name"];
    const vendor_email = request.body["vendor_email"];
    const company_name = request.body["company_name"];
    const vendor_site = request.body["vendor_site"];
    const company_register_no = request.body["company_register_no"];
    const gst_number = request.body["gst_number"];
    const vendor_password = request.body["vendor_password"];
    const confirm_vendor_password = request.body["confirm_vendor_password"];
    var flag = 0;
    
    if ( /^[a-zA-Z\s]*$/.test(vendor_name) && vendor_name.length >= 3 && /^[a-zA-Z\s]*$/.test(company_name) && company_name.length >= 3 && /^[a-zA-Z\s]*$/.test(vendor_site) && vendor_site.length >= 3 ) {
        flag += 0;
    }
    else {
        flag += 1;
    }

    if ( /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(vendor_email) ) {
        flag += 0;
    }
    else {
        flag += 1;
    }

    if ( /^[a-zA-Z0-9]*$/.test(company_register_no) && company_register_no.length == 21 && /^[a-zA-Z0-9]*$/.test(gst_number) && gst_number.length == 15 && /^[a-zA-Z0-9]*$/.test(vendor_password) && vendor_password.length >= 10 ) {
        flag += 0;
    }
    else {
        flag += 1;
    }

    if ( vendor_password == confirm_vendor_password ) {
        flag += 0;
    }
    else {
        flag += 1;
    }

    if (flag == 0) {
        const insert_statement = `INSERT INTO vendor ( vendor_name, vendor_email, company_name, vendor_site, company_register_no, gst_number, vendor_password ) VALUES ('${vendor_name}', '${vendor_email}', '${company_name}', '${vendor_site}', '${company_register_no}', '${gst_number}', '${vendor_password}');`;
        
        pool.query(insert_statement).then((response) => {
            console.log("Data Saved");
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })

        response.send("Response Recieved: " + request.body);
    }
    else {
        response.status(400).send({
            message: 'Please Re-Enter Correct Information!'
        });
    }
})

app.post("/vendor/login", (request, response) => {
    const gst_number = request.body["gst_number"];
    const vendor_password = request.body["vendor_password"];
    
    const select_statement = `SELECT gst_number, vendor_password, vendor_name FROM vendor;`; 

    var flag = 0;

    pool.query(select_statement).then((sql_response) => {
        v_name = "";
        for (let count = 0; count < sql_response.rowCount; count++) {
            if (sql_response.rows[count].gst_number == gst_number && sql_response.rows[count].vendor_password == vendor_password) {
                v_name = sql_response.rows[count].vendor_name;
                flag = 1;
            }          
        }

        if (flag == 1) {
            console.log("Data Extracted");
            console.log(response);
            response.send({name: v_name});
        }
        else {
            response.status(400).send({
                message: 'Please Re-Enter Valid Information!'
            });
        }
    })
    .catch((error) => {
        console.log('Error', error);
    })
})

app.get('/admin_manufacturer', (request, response) => {
    const select_statement = `SELECT * FROM manufacturer;`; 

    pool.query(select_statement, (sql_error, sql_results) => {
        if (sql_error) {
            throw sql_error;
        }
        console.log("Data Extracted");
        console.log(response);
        response.json(sql_results.rows);
    })
});

app.get('/admin_transporter', (request, response) => {
    const select_statement = `SELECT * FROM transporter;`; 

    pool.query(select_statement, (sql_error, sql_results) => {
        if (sql_error) {
            throw sql_error;
        }
        console.log("Data Extracted");
        console.log(response);
        response.json(sql_results.rows);
    })
});

app.get('/admin_distributor', (request, response) => {
    const select_statement = `SELECT * FROM distributor;`; 

    pool.query(select_statement, (sql_error, sql_results) => {
        if (sql_error) {
            throw sql_error;
        }
        console.log("Data Extracted");
        console.log(response);
        response.json(sql_results.rows);
    })
});

app.get('/admin_vendor', (request, response) => {
    const select_statement = `SELECT * FROM vendor;`; 

    pool.query(select_statement, (sql_error, sql_results) => {
        if (sql_error) {
            throw sql_error;
        }
        console.log("Data Extracted");
        console.log(response);
        response.json(sql_results.rows);
    })
});

app.get('/admin_user', (request, response) => {
    const select_statement = `SELECT * FROM client;`; 

    pool.query(select_statement, (sql_error, sql_results) => {
        if (sql_error) {
            throw sql_error;
        }
        console.log("Data Extracted");
        console.log(response);
        response.json(sql_results.rows);
    })
});

app.listen(4000, () => console.log("Server on port 4000"));