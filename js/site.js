import createIndexedDB, { insertEntries, countDBRows, readDBRows } from './dbModules.js';

// Main Document.Ready(); Function.
$(document).ready(() => {

    // Common Function For Showing Toast Notification.

    function showToastNotification(status, title, message) {
        if(status === "info") {
            toastr.info(title, message)
        } else if(status === "success") {
            toastr.success(title, message)
        } else if(status === "warning") {
            toastr.warning(title, message)
        } else {
            toastr.error(title, message)
        }

        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    }

    // Create IndexedDB Database.
    let db = createIndexedDB('student_records', {
        students: `++id, student_name, student_id`
    });

    // Read All Records From IndexedDB.
    function readAndAppendDBData(selector) {
        // Empty the 'tbody'.
        selector.empty();
        let template = '';
        // Read Data From DB
        readDBRows(db.students, (data) => {
            // Check If Data Found
            if(data) {
                // Hide 'No Records Found' Div.
                $('.no-db-records').hide();
                // Concatinate Data With HTML Template String.
                template = `
                    <tr>
                        <td>${data.id}</td>
                        <td>${data.student_name}</td>
                        <td>${data.student_id}</td>
                        <td>
                            <button type="button" class="table-actions-btns edit edit-table-record" title="Edit Record" data-id="${data.id}">
                                <span class="material-icons-outlined">edit_note</span>
                            </button>
                        </td>
                        <td>
                            <button type="button" class="table-actions-btns delete delete-table-record" title="Delete Record" data-id="${data.id}">
                                <span class="material-icons-outlined">delete</span>
                            </button>
                        </td>
                    </tr>
                `;
                // Append Concatinated Data in 'tbody'.
                selector.append(template);
            } else {
                // Show 'No Records Found' Div.
                $('.no-db-records').show();
                // Empty the 'tbody'.
                selector.empty();
            }
        });
    }
    
    // Edit Single Recoed.
    function editSingleTableRecord(recordID) {
        // Get ID Of The Single Record.
        let id = Number(recordID);
        // Disable 'Create' Button To Stop Creating Duplicate Record.
        $('.submit-btn').attr('disabled', 'disabled');
        // Get DB Data And Assign To The Textboxes.
        db.students.get(id, data => {
            $("#obj_id").val(data.id);
            $("#stud_name").val(data.student_name);
            $("#stud_id").val(data.student_id);
        });
    }

    // Delete Single Record.
    function deleteSingleTableRecord(recordID) {
        db.students.delete(recordID);
    }

    // This function increment ID count.
    function incrementIDCount() {
        countDBRows(db.students, (data) => {
            $("#obj_id").val(data.id + 1 || 1);
        });
    }

    // Check If Form Is Valid.
    function checkFormValidity() {
        let form = document.querySelector('.crud-form');
        let allFormElems = document.querySelectorAll('.crud-form-input');
        let totalValidFormElems = allFormElems.length;
        let validFormElems = $(form).find('.valid').length;
        if(validFormElems === totalValidFormElems) {
            form.classList.add('isValidForm');
        } else {
            form.classList.remove('isValidForm');
        }
    }

    // Input onChange Check Form Validation.
    function validateForm__ON_CHANGE() {
        let allFormElems = document.querySelectorAll('.crud-form-input');

        // STudent Name Input Validation.
        $(allFormElems[0]).on('keyup', function(){
            let val = $(this).val();
            let error_cnt = $(this).parent().find('.error-msg');
            let error = $(error_cnt);
            if(val == '') {
                error.text('Please enter Student Name');
                $(this).removeClass('valid');
            } else if(val.length < 6) {
                error.text('Please enter atleast 6 characters.');
                $(this).removeClass('valid');
            } else {
                error.text('');
                $(this).addClass('valid');
            }

            // Check Form Validity.
            checkFormValidity();
        });

        // STudent Roll No. Input Validation.
        $(allFormElems[1]).on('keyup', function(){
            let val = $(this).val();
            let error_cnt = $(this).parent().find('.error-msg');
            let error = $(error_cnt);
            if(val == '') {
                error.text('Please enter student your ID / Roll No.');
                $(this).removeClass('valid');
            } else if(val.length < 6) {
                error.text('Please enter valid student ID / Roll No.');
                $(this).removeClass('valid');
            } else {
                error.text('');
                $(this).addClass('valid');
            }

            // Check Form Validity.
            checkFormValidity();
        });
        
    }

    // Input onClick Check Form Validation.
    function validateForm__ON_CLICK() {
        let allFormElems = document.querySelectorAll('.crud-form-input');

        // STudent Name Input Validation.
        let val_EL1 = $(allFormElems[0]).val();
        let error_cnt_EL1 = $(allFormElems[0]).parent().find('.error-msg');
        let error_EL1 = $(error_cnt_EL1);
        if(val_EL1 == '') {
            error_EL1.text('Please enter Student Name');
            $(allFormElems[0]).removeClass('valid');
        } else if(val_EL1.length < 6) {
            error_EL1.text('Please enter atleast 6 characters.');
            $(allFormElems[0]).removeClass('valid');
        } else {
            error_EL1.text('');
            $(allFormElems[0]).addClass('valid');
        }

        // STudent Roll No. Input Validation.
        let val_EL2 = $(allFormElems[1]).val();
        let error_cnt_EL2 = $(allFormElems[1]).parent().find('.error-msg');
        let error_EL2 = $(error_cnt_EL2);
        if(val_EL2 == '') {
            error_EL2.text('Please enter student your ID / Roll No.');
            $(allFormElems[1]).removeClass('valid');
        } else if(val_EL2.length < 6) {
            error_EL2.text('Please enter valid student ID / Roll No.');
            $(allFormElems[1]).removeClass('valid');
        } else {
            error_EL2.text('');
            $(allFormElems[1]).addClass('valid');
        }

        // Check Form Validity.
        checkFormValidity();
    }

    // Input onChange Check Validity.
    validateForm__ON_CHANGE();

    // Hide All Error Messages.
    function hideAllErrorMessages() {
        // Get All Error Message.
        let allFormElems = document.querySelectorAll('.crud-form-input');
        let ermsg1 = $(allFormElems[0]).parent().find('.error-msg');
        let ermsg2 = $(allFormElems[1]).parent().find('.error-msg');
        // Remove Error message.
        $(ermsg1).text('');
        $(ermsg2).text('');
    }

    // Create Button Click.
    $('.crud-form').on('submit', function(e){
        e.preventDefault();
        let isValidForm = $(this).hasClass('isValidForm');
        validateForm__ON_CLICK();
        let objid = $("#obj_id").val();
        let std_nm = $("#stud_name").val();
        let std_id = $("#stud_id").val();
        // Check If Form Is Vallid.
        if(isValidForm) {
            // Insert Data into IndexedDB.
            let res = insertEntries(db.students, {
                student_name: std_nm,
                student_id: std_id
            });
            // Emppty Form.
            $("#stud_name").val('');
            $("#stud_id").val('');
            $(this).removeClass('isValidForm');
            // Increment Count With Current Row.
            incrementIDCount();
            // Read Table Again.
            $('.read-btn').trigger('click');
            // Show Toast Notification.
            showToastNotification('success', '!SUCCESS', 'Record Added Successfully.');
        }

    });

    // Increment ID Count On Page Load.
    incrementIDCount();

    // Read Data From IndexedDB.
    $('.read-btn').on('click', function(){
        readAndAppendDBData($("#dbTableData"));
    });

    // Read Data On Page Load.
    readAndAppendDBData($("#dbTableData"));

    // Edit Single Table Record Click.
    $('body').on('click','.edit-table-record', function(){
        let id = $(this).attr('data-id');
        editSingleTableRecord(id);
        // Enable 'Update' Button.
        $('.update-btn').removeAttr('disabled');
        // Hide All Error Messages.
        hideAllErrorMessages();
    });

    // Update Data On Click.
    $('.update-btn').on('click', function() {
        // Get ID Of The Single Record.
        let id = Number($("#obj_id").val());
        // Get Updated Textboxes Values And Send To DB.
        db.students.update(id, {
            student_name: $("#stud_name").val(),
            student_id: $("#stud_id").val()
        }).then(() => {
            // Make Textboxes Value Empty / Blank.
            $("#stud_name").val('');
            $("#stud_id").val('');
            $(this).attr('disabled', 'disabled');
            // Increment Count With Current Row.
            incrementIDCount();
            // Remove Valid Class from form.
            $('.crud-form').removeClass('isValidForm');
            // Hide All Error Messages.
            hideAllErrorMessages();
        });
        // Enable 'Create' Button.
        $('.submit-btn').removeAttr('disabled');
        // Read Table Again.
        $('.read-btn').trigger('click');
        showToastNotification('success', '!SUCCESS', 'Record Updated Successfully.');
    });

    // Delete Single Row On Click Show Confirmation Modal.
    $('body').on('click','.delete-table-record', function(){
        // Get Record Id
        let id = Number($(this).attr('data-id'));
        // Get Modal By ID.
        let mdl = $("#delSingleStudRec");
        // Find Modal Hidden Input.
        let mdlh_input = mdl.find("#hidmdl-objid");
        // Assign ID To Modal Hidden Input.
        $(mdlh_input).val(id);
        // Finally Show Delete Confirmation Modal.
        mdl.modal('show');
        // Hide All Error Messages.
        hideAllErrorMessages();
    });

    // Delete Single Row On Modal Button 'Yes' Click.
    $('.delete-studsrec-data').on('click', function(){
        // Get Modal By ID.
        let mdl = $("#delSingleStudRec");
        // Find Modal Hidden Input.
        let mdlh_input = mdl.find("#hidmdl-objid");
        // Get Record Id
        let id = Number($(mdlh_input).val());
        // Delete Single Record.
        deleteSingleTableRecord(id);
        // Read Table Again.
        $('.read-btn').trigger('click');
        // Finally Hide Delete Confirmation Modal.
        mdl.modal('hide');
        // Show Toast Notification.
        showToastNotification('success', '!SUCCESS', 'Record Deleted Successfully.');
    });

    // Delete All Records.
    $('.delete-all-btn').on('click', function(){
        // Get Modal By ID.
        let mdl = $("#delAllStudRec");
        // Show Modal.
        mdl.modal('show');
        // Hide All Error Messages.
        hideAllErrorMessages();
    });

    // Delete All Row On Modal Button 'Yes' Click.
    $('.delete-allstudsrec-data').on('click', function(){
        // Get Modal By ID.
        let mdl = $("#delAllStudRec");
        // Close Old DB And Delete.
        db.close();
        db.delete();
        let reloadPage = true;
        if(reloadPage === false) {
            // Create IndexedDB Database.
            db = createIndexedDB('student_records', {
                students: `++id, student_name, student_id`
            });
            db.open();
            // Empty 'tbody'.
            $("#dbTableData").empty();
            // Increment Count With Current Row.
            incrementIDCount();
            $('.read-btn').trigger('click');
            // Hide Modal.
            mdl.modal('hide');
            showToastNotification('success', '!SUCCESS', 'All Records And Database Deleted Successfully.');
        } else {
            // Reload window 
            window.location.reload();
        }
    });
    
}); // <== End DOM.Ready();
    