const db = require('../../Config/db')

class CustomerController {
    // [GET] / customer
    show(req, res, next) {
        const query  = 'select * from customer where cust_status = ?';
        db.query(query , ['active'], (error, result, fields) => {
                if (error) {
                        console.error('Error performing SELECT query:', error);
                        res.status(500).send('Internal Server Error');
                  } else {
                        res.send(result)
                  }
        })
       
    }

     // [post] / customer/store
     create(req, res, next) {
      const { Cust_Name, Cust_Phone, Cust_DateOfBirth, Cust_Gender, Cust_Address} = req.body;
      const Cust_Status = 'active'
      const Cust_Point = 0
      const queryNewID = `SELECT CONCAT('KH', LPAD(SUBSTRING(MAX(customer_id), 3) + 1, 8, '0')) AS new_cust_id FROM customer`;
      db.query(queryNewID, (error, result, fields) => {
          if (error) {
              console.error('Error performing SELECT query:', error);
              res.status(500).send('Internal Server Error');
          } else {
              const newCustId = result[0].new_cust_id;
              const insertQuery = 'INSERT INTO customer (customer_id, cust_name, cust_phone, cust_dateofbirth, cust_gender, cust_address, cust_point, cust_status) VALUES (?, ?, ?, ?, ?, ?, ?,?)';
              db.query(insertQuery, [newCustId, Cust_Name, Cust_Phone, Cust_DateOfBirth, Cust_Gender, Cust_Address, Cust_Point, Cust_Status], (error, result, fields) => {
                  if (error) {
                      console.error('Error performing INSERT query:', error);
                      res.status(500).send('Internal Server Error');
                  } else {
                      console.log(result);
                      res.status(201).send('Data created successfully');
                  }
              })
          }
      });
  }
  
  // [DELETE] / customer/:id
  delete(req, res, next) {
      const { id } = req.params;
      const deleteQuery = 'DELETE FROM customer WHERE customer_id = ?';
      db.query(deleteQuery, [id], (error, result, fields) => {
          if (error) {
              console.error('Error performing DELETE query:', error);
              res.status(500).send('Internal Server Error');
          } else {
              console.log(result);
              if (result.affectedRows === 0) {
                  res.status(404).send('Data not found');
              } else {
                  res.status(200).send('Data deleted successfully');
              }
          }
      });
  }
  
  // [UPDATE] customer/:id
  update(req, res, next) {
      const { id } = req.params;
      const { Cust_Name, Cust_Phone, Cust_DateOfBirth, Cust_Gender, Cust_Address, Cust_Point} = req.body;
      const updateQuery = 'UPDATE customer SET cust_name=?, cust_phone=?, cust_dateofbirth=?, cust_gender=?, cust_address=?, cust_point=? WHERE customer_id=?';
      db.query(updateQuery, [Cust_Name, Cust_Phone, Cust_DateOfBirth, Cust_Gender, Cust_Address, Cust_Point, id], (error, result, fields) => {
          if (error) {
              console.error('Error performing UPDATE query:', error);
              res.status(500).send('Internal Server Error');
          } else {
              console.log(result);
              if (result.affectedRows === 0) {
                  res.status(404).send('Data not found');
              } else {
                  res.status(200).send('Data updated successfully');
              }
          }
      });
  }
  
  



}

module.exports = new CustomerController;
