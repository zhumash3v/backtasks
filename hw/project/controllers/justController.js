const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const model = mongoose.model('model');

router.get('/', (req, res) => {
    res.render("model/addOrEdit", {
        viewTitle: "Insert model"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var model = new model();
    model.fullName = req.body.fullName;
    model.email = req.body.email;
    model.mobile = req.body.mobile;
    model.city = req.body.city;
    model.save((err, doc) => {
        if (!err)
            res.redirect('model/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("model/addOrEdit", {
                    viewTitle: "Insert model",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('model/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("model/addOrEdit", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("model/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving  list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("model/addOrEdit", {
                viewTitle: "Update",
                employee: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/model/list');
        }
        else { console.log('Error in delete :' + err); }
    });
});

module.exports = router;