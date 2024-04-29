const Formidable = require("formidable");
const fs = require("fs");
const xlsx = require("xlsx");
const path = require('path');

exports.post = (request, response) => {
  try {
    const form = new Formidable.IncomingForm();
    let dirFile;

    form.uploadDir = path.join('reports');
    form.keepExtensions = true;

    form.on("file", (field, file) => {

    if (
        !file ||
        file.mimetype !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
        return response
        .status(400)
        .json({ mensaje: "No se proporcionó un archivo Excel válido" });
    }

    dirFile = `${"reports/"+file.newFilename}`;

        // El archivo se ha recibido correctamente originalFilename
        // console.log("Archivo recibido:", file);

        // Leer el archivo XLSX
        const workBook = xlsx.readFile(`${"reports/"+file.newFilename}`);
        const workBookSheets = workBook.SheetNames;
        const sheet = workBookSheets[0];
        const data = xlsx.utils.sheet_to_json(workBook.Sheets[sheet]);

        // console.log("Datos del archivo XLSX:", data);

        response.status(201).json({ mensaje: "Archivo Excel recibido y procesado correctamente" });

        fs.unlink(dirFile, (err) => {
        if (err) {
            console.error("Error al eliminar el documento:", err);
            return;
        }
        console.log("Documento eliminado correctamente");
    });

    });
    form.on("error", (err) => {
        console.error("Error en el formulario:", err);
        response.status(500).json({ mensaje: `Error en el formulario: ${err.message}` });
    });

    form.parse(request);
    
} catch (error) {
    console.error("Error:", error);
    response.status(400).json({ mensaje: error.message });
}
};