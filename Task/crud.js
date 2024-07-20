const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: '192.168.29.181',
  user: 'admin',
  port: 3306,
  password: 'Raj@955009',
  database: 'transaction'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('MySQL Connected...');
});

app.use((req, res, next) => {
  req.db = db;
  next();
});

//amtdetails table

app.post('/api/amtdetails', (req, res) => {
  const {
    Date,
    Name,
    Amount,
    TransactionType,
    AccountNumber,
    Accountholdername,
    Transactionstatus,
    PaymentMethod,
    Image,
    Trans_id,
    id
  } = req.body;

  const sql = `insert into amtdetails(Date, Name, Amount, TransactionType, AccountNumber, Accountholdername, Transactionstatus, PaymentMethod, Image, Trans_id, id) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    Date,
    Name,
    Amount,
    TransactionType,
    AccountNumber,
    Accountholdername,
    Transactionstatus,
    PaymentMethod,
    Image,
    Trans_id,
    id
  ];

  console.log('SQL Query:', sql);
  console.log('Values:', values);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting record:', err);
      res.status(500).send('Error inserting record');
      return;
    }
    console.log('1 record inserted');
    res.status(201).send('User added');
  });
});

app.get('/api/amtdetails', (req, res) => {
  db.query('select * from amtdetails', (err, results) => {
    if (err) {
      console.error('Error fetching records:', err);
      res.status(500).send('Error fetching records');
      return;
    }
    res.json(results);
  });
});

app.get('/api/amtdetails/:id', (req, res) => {
  const { id } = req.params;
  db.query('select * from amtdetails where id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching record by ID:', err);
      res.status(500).send('Error fetching record by ID');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Record not found');
      return;
    }
    res.json(results[0]);
  });
});

app.put('/api/amtdetails/:id', (req, res) => {
  const { id } = req.params;
  const {
    Date,
    Name,
    Amount,
    TransactionType,
    AccountNumber,
    Accountholdername,
    Transactionstatus,
    PaymentMethod,
    Image,
    Trans_id
  } = req.body;

  if (!Date || !Name || !Amount || !TransactionType || !AccountNumber || !Accountholdername || !Transactionstatus || !PaymentMethod || !Image || !Trans_id) {
    return res.status(400).send('All fields are required');
  }

  const sql = `update amtdetails
               set Date = ?, 
                   Name = ?, 
                   Amount = ?, 
                   TransactionType = ?, 
                   AccountNumber = ?, 
                   Accountholdername = ?, 
                   Transactionstatus = ?, 
                   PaymentMethod = ?, 
                   Image = ?, 
                   Trans_id = ? 
               where id = ?;`

  const values = [
    Date,
    Name,
    Amount,
    TransactionType,
    AccountNumber,
    Accountholdername,
    Transactionstatus,
    PaymentMethod,
    Image,
    Trans_id,
    id
  ];

  console.log('SQL Query:', sql);
  console.log('Values:', values);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating record:', err);
      return res.status(500).send('Error updating record');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Record with ID ${id} not found');
    }
    console.log(`Updated record with ID ${id}`);
    res.status(200).send('Updated record with ID ${id}');
  });
});

app.delete('/api/amtdetails/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'delete from amtdetails where id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting record:', err);
      return res.status(500).send('Error deleting record');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Record with ID ${id} not found');
    }
    console.log('Deleted record with ID ${id}');
    res.status(200).send('Deleted record with ID ${id}');
  });
});

//department table 

app.post('/api/departments', (req, res) => {
    const { Dept_id, Deptname } = req.body;
    const sql = "insert into departments (Dept_id, Deptname) VALUES (?, ?)";
    const values = [Dept_id, Deptname];

    console.log('values:', values);

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting record:', err);
            res.status(500).send('Error inserting record');
            return;
        }
        console.log('1 record inserted');
        res.status(201).send('User added');
    });
});

app.get('/api/departments', (req, res) => {
    db.query('select * from departments', (err, results) => {
      if (err) {
        console.error('Error fetching records:', err);
        res.status(500).send('Error fetching records');
        return;
      }
      res.json(results);
    });
  });

app.get('/api/departments/:Dept_id', (req, res) => {
    const { Dept_id } = req.params;
    db.query('select * from departments where Dept_id = ?', [Dept_id], (err, results) => {
      if (err) {
        console.error('Error fetching record by Dept_id:', err);
        res.status(500).send('Error fetching record by Dept_id');
        return;
      }
      if (results.length === 0) {
        res.status(404).send('Record not found');
        return;
      }
      res.json(results[0]);
    });
  });

app.put('/api/departments/:Dept_id', (req, res) => {
    const { Dept_id } = req.params;
    const { Deptname } = req.body;

    if (!Deptname) {
        return res.status(400).send('All fields are required');
    }

    const sql = 'update departments set Deptname = ? where Dept_id = ?';
    const values = [Deptname, Dept_id];

    console.log('values:', values);

    db.query(sql, values, (err, result) => {
        if (err) {
            console.log('Error updating record:', err);
            return res.status(500).send('Error updating record');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Record with ID ${Dept_id} not found');
        }

        console.log('Updated record with ID ${Dept_id}');
        res.status(200).send('Updated record with ID ${Dept_id}');
    });
});

app.delete('/api/departments/:Dept_id', (req, res) => {
    const { Dept_id } = req.params;

    const sql = 'delete from departments where Dept_id = ?';

    db.query(sql, [Dept_id], (err, result) => {
        if (err) {
            console.error('Error deleting record:', err);
            return res.status(500).send('Error deleting record');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Record with ID ${Dept_id} not found');
        }
        console.log('Deleted record with ID ${Dept_id}');
        res.status(200).send('Deleted record with ID ${Dept_id}');
    });
});


//user table

app.post('/api/user', (req, res) => {
    const { Username, Phonenumber, Password, conformpassword, firstname, lastname, id } = req.body;
    
    if (!Username || !Phonenumber || !Password || !conformpassword || !firstname || !lastname || !id) {
        res.status(400).send('All fields are required');
        return;
    }

    const sql = 'INSERT INTO user (Username, Phonenumber, Password, conformpassword, firstname, lastname, id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [Username, Phonenumber, Password, conformpassword, firstname, lastname, id];
    
    console.log('values:', values);

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting record:', err);
            res.status(500).send('Error inserting record');
            return;
        }
        console.log('1 record inserted');
        res.status(201).send('User added');
    });
});

app.get('/api/user', (req, res) => {
  db.query('select * from user', (err, results) => {
      if (err) {
          console.error('Error fetching records:', err);
          res.status(500).send('Error fetching records');
          return;
      }
      res.json(results);
  });
});

app.get('/api/user/:id', (req, res) => {
  const { id } = req.params;
  db.query('select * from user where id = ?', [id], (err, results) => {
      if (err) {
          console.error('Error fetching record by id:', err);
          res.status(500).send('Error fetching record by id');
          return;
      }
      if (results.length === 0) {
          res.status(404).send('Record not found');
          return;
      }
      res.json(results[0]);
  });
});


app.put('/api/user/:id', (req, res) => {
  const { id } = req.params;
  const { Username, Phonenumber, Password, conformpassword, firstname, lastname } = req.body;

  if (!Username || !Phonenumber || !Password || !conformpassword || !firstname || !lastname) {
      return res.status(400).send('All fields are required');
  }
  if (Password !== conformpassword) {
      return res.status(400).send('Passwords do not match');
  }

  const sql = `UPDATE user SET Username = ?, Phonenumber = ?, Password = ?, conformpassword = ?, firstname = ?, lastname = ? WHERE id = ?`;
  const values = [Username, Phonenumber, Password, conformpassword, firstname, lastname, id];
  console.log('values:', values);

  db.query(sql, values, (err, result) => {
      if (err) {
          console.error('Error updating record:', err);
          return res.status(500).send('Error updating record');
      }
      if (result.affectedRows === 0) {
          return res.status(404).send(`Record with id ${id} not found`);
      }
      console.log(`Updated record with ID ${id}`);
      res.status(200).send(`Updated record with id ${id}`);
  });
});


app.delete('/api/user/:id',(req,res)=>{
    const{id}=req.params;
    const sql='delete from user where id=?';
    db.query(sql, [id], (err, result) => {
        if (err) {
          console.error('Error deleting record:', err);
          return res.status(500).send('Error deleting record');
        }
        if (result.affectedRows === 0) {
          return res.status(404).send('Record with ID ${id} not found');
        }
        console.log('Deleted record with id ${id}');
        res.status(200).send('Deleted record with id ${id}');
      });
    });


//employ table

app.post('/api/employ', (req, res) => {
    const {Emp_id,empname,dept_id} = req.body;
  
    if (!Emp_id || !empname || !dept_id) {
      return res.status(400).send('Emp_id, empname, and dept_id are required');
    }
  
    const sql = `insert into employ(Emp_id,empname,dept_id) 
                 VALUES (?, ?, ?)`;
  
    const values = [Emp_id,empname,dept_id];
  
    console.log('Values:', values);
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting record:', err);
        res.status(500).send('Error inserting record');
        return;
      }
      console.log('1 record inserted');
      res.status(201).send('User added');
    });
  });
  
  app.get('/api/employ', (req, res) => {
      db.query('select * from employ', (err, results) => {
        if (err) {
          console.error('Error fetching records:', err);
          res.status(500).send('Error fetching records');
          return;
        }
        res.json(results);
      });
    });
    
    app.get('/api/employ/:Emp_id', (req, res) => {
      const { Emp_id } = req.params;
      db.query('select * from employ where Emp_id = ?', [Emp_id], (err, results) => {
        if (err) {
          console.error('Error fetching record by ID:', err);
          res.status(500).send('Error fetching record by ID');
          return;
        }
        if (results.length === 0) {
          res.status(404).send('Record not found');
          return;
        }
        res.json(results[0]);
      });
    });
    app.put('/api/employ/:Emp_id', (req, res) => {
      const { Emp_id } = req.params;
      const { empname, dept_id } = req.body;
  
      if (!empname || !dept_id) {
          return res.status(400).send('All fields are required');
      }
  
      const sql = 'UPDATE employ SET empname = ?, dept_id = ? WHERE Emp_id = ?';
      const values = [empname, dept_id, Emp_id];
  
      console.log('Values:', values);
  
      db.query(sql, values, (err, result) => {
          if (err) {
              console.log('Error updating record:', err);
              return res.status(500).send('Error updating record');
          }
  
          if (result.affectedRows === 0) {
              return res.status(404).send('Record with ID ${Emp_id} not found');
          }
  
          console.log('Updated record with ID ${Emp_id}');
          res.status(200).send('Updated record with ID ${Emp_id}');
      });
  });
  
  app.delete('/api/employ/:Emp_id', (req, res) => {
      const { Emp_id } = req.params;
    
      const sql = 'delete from employ where Emp_id = ?';
    
      db.query(sql, [Emp_id], (err, result) => {
        if (err) {
          console.error('Error deleting record:', err);
          return res.status(500).send('Error deleting record');
        }
        if (result.affectedRows === 0) {
          return res.status(404).send('Record with ID ${Emp_id} not found');
        }
        console.log('Deleted record with ID ${Emp_id}');
        res.status(200).send('Deleted record with ID ${Emp_id}');
      });
    });


//history table
app.post('/api/history',(req,res)=>{
    const{ Fromdate,Todate}=req.body;
    const sql='insert into history(Fromdate,Todate) values(?,?)';
    const values=[Fromdate,Todate];
    console.log('Values:',values);
    db.query(sql,values,(err,result)=>{
        if(err){
            console.log('error inserting Record:',err)
            res.status(500).send('error inserting record');
            return;
        }
        console.log('1 record inserted');
        res.status(201).send('user added');


    });
});
app.get('/api/history',(req,res)=>{
    db.query('select * from history',(err,result)=>{
        if (err){
            console.error('Error fetching records:');
            res.status(500).send('Error fetching records');
            return;
        }
        res.json(result);
    });
});
app.get('/api/history/:Fromdate', (req, res) => {
    const { Fromdate} = req.params;
    db.query('select * from history where Fromdate = ?', [Fromdate], (err, results) => {
      if (err) {
        console.error('Error fetching record by Fromdate:', err);
        res.status(500).send('Error fetching record by Fromdate');
        return;
      }
      if (results.length === 0) {
        res.status(404).send('Record not found');
        return;
      }
      res.json(results[0]);
    });
  });

  app.put('/api/history/:Fromdate', (req, res) => {
    const { Fromdate } = req.params;
    const updateData = req.body; 
    if (!Fromdate || Object.keys(updateData).length === 0) {
        res.status(400).send('Invalid input');
        return;
    }

    db.query('update history SET ? where Fromdate = ?', [updateData, Fromdate], (err, result) => {
        if (err) {
            console.error('Error updating record by Fromdate:', err);
            res.status(500).send('Error updating record by Fromdate');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Record not found');
            return;
        }
        res.send('Record updated successfully');
    });
});

app.delete('/api/history/:Fromdate', (req, res) => {
    const { Fromdate } = req.params;

    const sql = 'delete from history where Fromdate = ?';

    db.query(sql, [Fromdate], (err, result) => {
        if (err) {
            console.error('Error deleting record:', err);
            return res.status(500).send('Error deleting record');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Record with Fromdate ${Fromdate} not found');
        }
        console.log('Deleted record with Fromdate ${Fromdate}');
        res.status(200).send('Deleted record with Fromdate ${Fromdate}');
    });
});


//payment table

app.post('/api/paymentmethod', (req, res) => {
    const { PaymentType } = req.body;
    
    if (!PaymentType) {
      return res.status(400).send('PaymentType is required');
    }
    
    const sql = `insert into paymentmethod (PaymentType) VALUES (?)`;
    const values = [PaymentType];
    
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting record:', err);
        return res.status(500).send('Error inserting record');
      }
      
      console.log('1 record inserted');
      res.status(201).send('Payment method added');
    });
  });
  
  app.get('/api/paymentmethod', (req, res) => {
      db.query('select * from paymentmethod', (err, results) => {
        if (err) {
          console.error('Error fetching records:', err);
          res.status(500).send('Error fetching records');
          return;
        }
        res.json(results);
      });
    });
    
    app.get('/api/paymentmethod/:PaymentType', (req, res) => {
      const { PaymentType } = req.params;
      db.query('select * from paymentmethod where PaymentType = ?', [PaymentType], (err, results) => {
        if (err) {
          console.error('Error fetching record by ID:', err);
          res.status(500).send('Error fetching record by ID');
          return;
        }
        if (results.length === 0) {
          res.status(404).send('Record not found');
          return;
        }
        res.json(results[0]);
      });
    });
  
    app.put('/api/paymentmethod/:PaymentType', (req, res) => {
      const { PaymentType } = req.params;
      if (!PaymentType) {
          return res.status(400).send('New PaymentType is required');
      }
  
      const sql = 'UPDATE paymentmethod SET PaymentType = ? WHERE PaymentType = ?';
      const values = [PaymentType];
  
      db.query(sql, values, (err, result) => {
          if (err) {
              console.log('Error updating record:', err);
              return res.status(500).send('Error updating record');
          }
  
          if (result.affectedRows === 0) {
              return res.status(404).send(`PaymentType ${PaymentType} not found`);
          }
  
          console.log(`Updated PaymentType ${PaymentType} to ${PaymentType}`);
          res.status(200).send(`Updated PaymentType ${PaymentType} to ${PaymentType}`);
      });
  });
  
    
    app.delete('/api/paymentmethod/:PaymentType', (req, res) => {
      const { PaymentType } = req.params;
    
      const sql = 'delete from paymentmethod where PaymentType = ?';
    
      db.query(sql, [PaymentType], (err, result) => {
        if (err) {
          console.error('Error deleting record:', err);
          return res.status(500).send('Error deleting record');
        }
        if (result.affectedRows === 0) {
          return res.status(404).send('Record with PaymentType ${PaymentType} not found');
        }
        console.log('Deleted record with PaymentType ${PaymentType}');
        res.status(200).send('Deleted record with PaymentType ${PaymentType}');
      });
    });

//dashboard table

app.post('/api/dashboard', (req, res) => {
    const {TotalAvailableBalance,LastmonthspentBill,LastSixMonthbills,DebitAmt,creditAmt} = req.body;
  
    if (!TotalAvailableBalance || !LastmonthspentBill || !LastSixMonthbills ||!DebitAmt || !creditAmt) {
      return res.status(400).send('TotalAvailableBalance,LastmonthspentBill,LastSixMonthbills,DebitAmt,creditAmt are required');
    }
  
    const sql = `insert into dashboard(TotalAvailableBalance,LastmonthspentBill,LastSixMonthbills,DebitAmt,creditAmt) 
                 VALUES (?, ?, ?, ?, ?)`;
  
    const values = [TotalAvailableBalance,LastmonthspentBill,LastSixMonthbills,DebitAmt,creditAmt];
  
    console.log('Values:', values);
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting record:', err);
        res.status(500).send('Error inserting record');
        return;
      }
      console.log('1 record inserted');
      res.status(201).send('User added');
    });
  });
  
  app.get('/api/dashboard', (req, res) => {
      db.query('SELECT * FROM dashboard', (err, results) => {
        if (err) {
          console.error('Error fetching records:', err);
          res.status(500).send('Error fetching records');
          return;
        }
        res.json(results);
      });
    });
    
  
    app.get('/api/dashboard/:creditAmt', (req, res) => {
      const { creditAmt } = req.params;
      db.query('select * from dashboard where creditAmt = ?', [creditAmt], (err, results) => {
        if (err) {
          console.error('Error fetching record by creditAmt:', err);
          res.status(500).send('Error fetching record by creditAmt');
          return;
        }
        if (results.length === 0) {
          res.status(404).send('Record not found');
          return;
        }
        res.json(results[0]);
      });
    });
  
  app.put('/api/dashboard/:creditAmt', (req, res) => {
      const { creditAmt } = req.params;
      const { TotalAvailableBalance, LastmonthspentBill, LastSixMonthbills, DebitAmt,creditAmt:newcreditAmt } = req.body;
    
  
      db.query(
        'update dashboard SET TotalAvailableBalance = ?, LastmonthspentBill = ?, LastSixMonthbills = ?, DebitAmt = ?, creditAmt = ? WHERE creditAmt = ?',
        [TotalAvailableBalance, LastmonthspentBill, LastSixMonthbills, DebitAmt,newcreditAmt,creditAmt],
        (err, results) => {
          if (err) {
            console.error('Error updating record by creditAmt:', err);
            res.status(500).send('Error updating record by creditAmt');
            return;
          }
          res.status(200).send('Record updated successfully');
        }
      );
    });
    
  app.delete('/api/dashboard/:creditAmt', (req, res) => {
      const { TotalAvailableBalance, LastmonthspentBill, LastSixMonthbills, DebitAmt,creditAmt } = req.params;
    
      const sql = 'delete from dashboard where creditAmt  = ?';
    
      db.query(sql, [creditAmt], (err, result) => {
        if (err) {
          console.error('Error deleting record:', err);
          return res.status(500).send('Error deleting record');
        }
        if (result.affectedRows === 0) {
          return res.status(404).send('Record with creditAmt ${creditAmt} not found');
        }
        console.log('Deleted record with creditAmt ${creditAmt}');
        res.status(200).send('Deleted record with creditAmt ${creditAmt}');
      });
    });
  
 const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
  });
  