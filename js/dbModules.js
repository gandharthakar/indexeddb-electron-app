
// Create indexedDB Databse Using Dexie Wrapper.
function createIndexedDB(dbname, table) {    
    let db = new Dexie(dbname);
    db.version(1).stores(table);
    db.open();
    return db;
}

// Check textbox validation.
let empty = object => {
    let flag = false;
    for(const value in object) {
        if(object[value] != '' && object.hasOwnProperty(value)) {
            flag = true;
        } else {
            flag = false;
        }
    }
    return flag;
}

// Insert Data into Table.
function insertEntries(tableName, data) {
    let flag = empty(data);
    if(flag) {
        tableName.bulkAdd([data]);
    } else {
        alert("Please Provide Data.");
    }
    return flag;    
}

// Helper Function To Sort Returned Onjects Into Desire Pattern
function sortDBRows(sortobj) {
    let obj = {}
    obj = {
        id: sortobj.id,
        student_name: sortobj.student_name,
        student_id: sortobj.student_id
    }
    return obj;
}

// Count Number Of Rows.
function countDBRows(tableName, fn) {
    let index = 0;
    let obj = {};
    tableName.count((count) => {
        if(count) {
            tableName.each(table => {
                obj = sortDBRows(table);
                fn(obj, index++);
            });
        } else {
            fn(0);
        }
    });
}

// Count Number Of Rows.
function readDBRows(tableName, fn) {
    let index = 0;
    let obj = {};
    tableName.count((count) => {
        if(count) {
            tableName.each(table => {
                obj = sortDBRows(table);
                fn(obj, index++);
            });
        } else {
            fn(0);
        }
    });
}

export default createIndexedDB;
export {
    insertEntries,
    countDBRows,
    readDBRows
}