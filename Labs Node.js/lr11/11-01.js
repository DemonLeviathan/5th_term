const express = require('express');
const sql = require('mssql');
const path = require('path');
const app = express();
const port = 3000;

const config = {
    user: 'sa',
    password: '1111',
    server: 'DEMON-LEVIATHAN',
    database: 'lr11',
    port: 1433,
    options: {
        encrypt: false
    },
    pool: {
        min: 4,
        max: 10,
        idleTimeoutMillis: 30000
    }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname + '/index.html'));
});


sql.connect(config).then(pool => {
    app.get('/api/faculties', (request, response) => {
        pool.request().query('SELECT * FROM FACULTY', (err, result) => {
            if (err) {
                console.error(err);
                response.status(500).send(err);
            } else {
                response.json(result.recordset);
            }
        });
    });

    app.get('/api/pulpits', (request, response) => {
        pool.request().query('SELECT * FROM PULPIT', (err, result) => {
            if (err) {
                console.error(err);
                response.status(500).send(err);
            } else {
                response.json(result.recordset);
            }
        });
    });

    app.get('/api/subjects', (request, response) => {
        pool.request().query('SELECT * FROM SUBJECT', (err, result) => {
            if (err) {
                console.error(err);
                response.status(500).send(err);
            } else {
                response.json(result.recordset);
            }
        });
    });

    app.get('/api/auditoriumstypes', (request, response) => {
        pool.request().query('SELECT * FROM AUDITORIUM_TYPE', (err, result) => {
            if (err) {
                console.error(err);
                response.status(500).send(err);
            } else {
                response.json(result.recordset);
            }
        });
    });

    app.get('/api/auditoriums', (request, response) => {
        pool.request().query('SELECT * FROM AUDITORIUM', (err, result) => {
            if (err) {
                console.error(err);
                response.status(500).send(err);
            } else {
                response.json(result.recordset);
            }
        });
    });

    app.get('/api/faculty/:id/pulpits', (request, response) => {
        pool.request().query(`SELECT * FROM PULPIT WHERE FACULTY = N'${request.params.id}'`, (err, result) => {
            if (err) {
                console.error(err);
                response.status(500).send(err);
            } else {
                response.json(result.recordset);
            }
        });
    });

    app.get('/api/auditoriumtypes/:id/auditoriums', (request, response) => {
        pool.request().query(`SELECT * FROM AUDITORIUM WHERE AUDITORIUM_TYPE = N'${request.params.id}'`, (err, result) => {
            if (err) {
                console.error(err);
                response.status(500).send(err);
            } else {
                response.json(result.recordset);
            }
        });
    });

    app.post('/api/pulpits', (request, response) => {
        const { PULPIT, PULPIT_NAME, FACULTY } = request.body;
        pool.request().query(`INSERT INTO PULPIT VALUES (N'${PULPIT}', N'${PULPIT_NAME}', N'${FACULTY}')`, (err, result) => {
            if (err) {
                console.error(err);
                response.status(500).send(err);
            } else {
                response.json(result);
            }
        });
    });

    app.post('/api/subjects', (request, response) => {
        const { SUBJECT, SUBJECT_NAME, PULPIT } = request.body;
        pool.request().query(`INSERT INTO SUBJECT VALUES (N'${SUBJECT}', N'${SUBJECT_NAME}', N'${PULPIT}')`, (err, result) => {
            if (err) {
                console.error(err);
                response.status(500).send(err);
            } else {
                response.json(result);
            }
        });
    });

    app.post('/api/auditoriumstypes', (request, response) => {
        const { AUDITORIUM_TYPE, AUDITORIUM_TYPENAME } = request.body;
        pool.request().query(`INSERT INTO AUDITORIUM_TYPE VALUES (N'${AUDITORIUM_TYPE}', N'${AUDITORIUM_TYPENAME}')`, (err, result) => {
            if (err) {
                console.error(err);
                response.status(500).send(err);
            } else {
                response.json(result);
            }
        });
    });

    app.post('/api/auditoriums', (request, response) => {
        const { AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE } = request.body;
        pool.request().query(`INSERT INTO AUDITORIUM VALUES (N'${AUDITORIUM}', N'${AUDITORIUM_NAME}', ${AUDITORIUM_CAPACITY}, N'${AUDITORIUM_TYPE}')`, (err, result) => {
            if (err) {
                console.error(err);
                response.status(500).send(err);
            } else {
                response.json(result);
            }
        });
    });

    app.put('/api/faculties', (request, response) => {
        const { FACULTY, FACULTY_NAME } = request.body;
        pool.request().query(`UPDATE FACULTY SET FACULTY_NAME = N'${FACULTY_NAME}' WHERE FACULTY = N'${FACULTY}'`, (err, result) => {
            if (err) {
                console.error(err);
                response.status(500).send(err);
            } else {
                response.json(result);
            }
        });
    });

    app.put('/api/pulpits', (request, response) => {
        const { PULPIT, PULPIT_NAME, FACULTY } = request.body;
        pool.request().query(`UPDATE PULPIT SET PULPIT_NAME = N'${PULPIT_NAME}', FACULTY = N'${FACULTY}' WHERE PULPIT = N'${PULPIT}'`, (err, result) => {
            if (err) {
                console.error(err);
                response.status(500).send(err);
            } else {
                response.json(result);
            }
        });
    });

    app.put('/api/subjects', (request, response) => {
        const { SUBJECT, SUBJECT_NAME, PULPIT } = request.body;
        pool.request().query(`UPDATE SUBJECT SET SUBJECT_NAME = N'${SUBJECT_NAME}', PULPIT = N'${PULPIT}' WHERE SUBJECT = N'${SUBJECT}'`, (err, result) => {
            if (err) {
                console.error(err);
                response.status(500).send(err);
            } else {
                response.json(result);
            }
        });
    });

    app.put('/api/auditoriumstypes', (request, response) => {
        let { AUDITORIUM_TYPE, AUDITORIUM_TYPENAME } = request.body;

        pool.request().query(`UPDATE AUDITORIUM_TYPE SET AUDITORIUM_TYPENAME = N'${AUDITORIUM_TYPENAME}' WHERE AUDITORIUM_TYPE = N'${AUDITORIUM_TYPE}'`, (err, result) => {
            if (err) {
                console.error(err);
                response.status(500).send(err);
            } else {
                response.json(result);
            }
        });
    });

    app.put('/api/auditoriums', (request, response) => {
        const { AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE } = request.body;
        pool.request().query(`UPDATE AUDITORIUM SET AUDITORIUM_NAME = N'${AUDITORIUM_NAME}', AUDITORIUM_CAPACITY = ${AUDITORIUM_CAPACITY}, AUDITORIUM_TYPE = N'${AUDITORIUM_TYPE}' WHERE AUDITORIUM = N'${AUDITORIUM}'`, (err, result) => {
            if (err) {
                console.error(err);
                response.status(500).send(err);
            } else {
                response.json(result);
            }
        });
    });

    app.delete('/api/faculties/:id', (request, response) => {
        pool.request().query(`DELETE FROM FACULTY WHERE FACULTY = N'${request.params.id}'`, (err, result) => {
            if (err) {
                console.error(err);
                response.status(500).send(err);
            } else {
                response.json(result);
            }
        });
    });

    app.delete('/api/pulpits/:id', (request, response) => {
        pool.request().query(`DELETE FROM PULPIT WHERE PULPIT = N'${request.params.id}'`, (err, result) => {
            if (err) {
                console.error(err);
                response.status(500).send(err);
            } else {
                response.json(result);
            }
        });
    });

    app.delete('/api/subjects/:id', (request, response) => {
        pool.request().query(`DELETE FROM SUBJECT WHERE SUBJECT = N'${request.params.id}'`, (err, result) => {
            if (err) {
                console.error(err);
                response.status(500).send(err);
            } else {
                response.json(result);
            }
        });
    });

    app.delete('/api/auditoriumtypes/:id', (request, response) => {
        pool.request().query(`DELETE FROM AUDITORIUM_TYPE WHERE AUDITORIUM_TYPE = N'${request.params.id}'`, (err, result) => {
            if (err) {
                console.error(err);
                response.status(500).send(err);
            } else {
                response.json(result);
            }
        });
    });

    app.delete('/api/auditoriums/:id', (request, response) => {
        pool.request().query(`DELETE FROM AUDITORIUM WHERE AUDITORIUM = N'${request.params.id}'`, (err, result) => {
            if (err) {
                console.error(err);
                response.status(500).send(err);
            } else {
                response.json(result);
            }
        });
    });
}).catch(err => {
    console.error(err);
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});