/// <reference path="./crud.d.ts" />
import { RowID, RowElement } from "./interface";
import { insertRow, deleteRow, updateRow } from "./crud";

const row: RowElement = {
    firstName: "Guillaume",
    lastName: "Salva",
}

const newRowID: RowID = insertRow(row);

const updatedRow: RowElement = {
    firstName: "Guillaume",
    lastName: "Salva",
    age: 23,
}

updateRow(newRowID, updatedRow);

deleteRow(newRowID);