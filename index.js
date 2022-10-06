let fileInput, downloadButton, inscriptions;

window.onload = () => {
    fileInput = document.getElementById('fileInput');
    downloadButton = document.getElementById('downloadButton');
    setEventListeners();
}

function setEventListeners() {
    fileInput.addEventListener("change", () => {
        const reader = new FileReader();
        reader.onload = () => {
            inscriptions = getInscriptionsFromCSVData(reader.result);
        }
        reader.readAsText(fileInput.files[0]);
    })

    downloadButton.addEventListener('click', () => {
        downloadInscriptions();
    });
}

async function downloadInscriptions() {
    let i = 0;
    for (const inscription of inscriptions) {
        const year_ = inscription[3].split('/')[2];
        if (true || year_ == 2011 || year_ == 2012 || year_ == 2010) {
            const url = 'assets/inscription.pdf';
            const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

            const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes)

            const pages = pdfDoc.getPages()
            const firstPage = pages[0];
            const { width, height } = firstPage.getSize()

            const activityName = getActivityByDate(inscription[3]) || '';
            // Activitat
            firstPage.drawText('Casal ' + activityName, {
                x: 200,
                y: height - 127,
                size: 12
            })

            const nameParts = inscription[2].replace('  ', ' ').split(' ');
            let surname = nameParts[1];
            if (nameParts[2]) {
                surname += ' ' + nameParts[2];
            }
            // Cognoms
            firstPage.drawText(surname, {
                x: 200,
                y: height - 185,
                size: 11
            })

            // Nom
            firstPage.drawText(nameParts[0] || '', {
                x: 420,
                y: height - 185,
                size: 11
            })

            // Data Naixement
            firstPage.drawText(inscription[3] || '', {
                x: 200,
                y: height - 201,
                size: 10
            })

            // Adreça
            firstPage.drawText(inscription[4] || '', {
                x: 200,
                y: height - 217,
                size: 10
            })

            // Població
            firstPage.drawText(inscription[5] || '', {
                x: 200,
                y: height - 233,
                size: 10
            })

            // CP
            firstPage.drawText(inscription[6] || '', {
                x: 420,
                y: height - 233,
                size: 10
            })

            // Tel Contacte1
            firstPage.drawText(inscription[9] || '', {
                x: 200,
                y: height - 266,
                size: 10
            })

            // Nom Contacte1
            firstPage.drawText(inscription[7] || '', {
                x: 360,
                y: height - 266,
                size: 10
            })

            // Tel Contacte2
            firstPage.drawText(inscription[13] || '', {
                x: 200,
                y: height - 281,
                size: 10
            })

            // Nom Contacte2
            firstPage.drawText(inscription[11] || '', {
                x: 360,
                y: height - 281,
                size: 10
            })

            // Correu 1
            firstPage.drawText(inscription[8] || '', {
                x: 200,
                y: height - 311,
                size: 10
            })

            // Correu 2
            firstPage.drawText(inscription[12] || '', {
                x: 200,
                y: height - 326,
                size: 10
            })

            if (inscription[17] == 'Sí') {
                // ticksi
                firstPage.drawText('x', {
                    x: 238,
                    y: height - 563,
                    size: 12
                })
            } else {
                // tickno
                firstPage.drawText('x', {
                    x: 263,
                    y: height - 563,
                    size: 12
                })
            }

            if (inscription[18] == 'Sí') {
                // ticksi
                firstPage.drawText('x', {
                    x: 284,
                    y: height - 584,
                    size: 12
                })
            } else {
                // tickno
                firstPage.drawText('x', {
                    x: 308,
                    y: height - 584,
                    size: 12
                })
            }


            if (inscription[19] == 'Sí') {
                // ticksi
                firstPage.drawText('x', {
                    x: 362,
                    y: height - 619,
                    size: 12
                })
            } else {
                // tickno
                firstPage.drawText('x', {
                    x: 387,
                    y: height - 619,
                    size: 12
                })
            }


            firstPage.drawText('Pes: ' + inscription[20] + 'kg', {
                x: 430,
                y: height - 619,
                size: 7
            })

            /* PAGE 2 */
            const secondPage = pages[1];
            console.log(inscription);

            // Fitxa de salut
            secondPage.drawText(inscription[25] || '', {
                x: 85,
                y: height - 110,
                size: 10
            })


            // És habil
            if (inscription[21] == 'Sí') {
                // ticksi
                secondPage.drawText('x', {
                    x: 129,
                    y: height - 170,
                    size: 12
                })
            } else {
                // tickno
                secondPage.drawText('x', {
                    x: 158,
                    y: height - 170,
                    size: 12
                })
            }


            // Sap nedar
            if (inscription[22] == 'Sí') {
                // ticksi
                secondPage.drawText('x', {
                    x: 158,
                    y: height - 188,
                    size: 12
                })
            } else {
                // tickno
                secondPage.drawText('x', {
                    x: 193,
                    y: height - 188,
                    size: 12
                })
            }


            // Sap nedar
            if (inscription[22] == 'Sí') {
                // ticksi
                secondPage.drawText('x', {
                    x: 158,
                    y: height - 188,
                    size: 12
                })
            } else {
                // tickno
                secondPage.drawText('x', {
                    x: 193,
                    y: height - 188,
                    size: 12
                })
            }


            // Es fatiga
            if (inscription[23] == 'Sí') {
                // ticksi
                secondPage.drawText('x', {
                    x: 193,
                    y: height - 206,
                    size: 12
                })
            } else {
                // tickno
                secondPage.drawText('x', {
                    x: 229,
                    y: height - 206,
                    size: 12
                })
            }

            // Es mareja
            if (inscription[24] == 'Sí') {
                // ticksi
                secondPage.drawText('x', {
                    x: 229,
                    y: height - 224,
                    size: 12
                })
            } else {
                // tickno
                secondPage.drawText('x', {
                    x: 264,
                    y: height - 224,
                    size: 12
                })
            }


            // es posa malalt?
            secondPage.drawText(inscription[27] || '', {
                x: 85,
                y: height - 275,
                size: 10
            })

            // alèrgia
            secondPage.drawText(inscription[28] || '', {
                x: 85,
                y: height - 315,
                size: 10
            })

            // malaltia
            secondPage.drawText(inscription[29] || '', {
                x: 85,
                y: height - 355,
                size: 10
            })

            // medicament
            secondPage.drawText(inscription[32] || '', {
                x: 85,
                y: height - 400,
                size: 10
            })

            // vacunes
            secondPage.drawText(inscription[31] || '', {
                x: 85,
                y: height - 445,
                size: 10
            })

            // impediments
            secondPage.drawText(wrap(inscription[33]) || '', {
                x: 85,
                y: height - 490,
                size: 8,
                lineHeight: 14
            })

            // observacions
            secondPage.drawText(wrap(inscription[34]) || '', {
                x: 85,
                y: height - 565,
                size: 8,
                lineHeight: 14
            })

            const fileName = `${inscription[2].toLowerCase()}-${activityName.toLowerCase()}`;
            const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: false });
            if (pdfDataUri) console.count('downloading'); console.log(fileName);
            downloadPDF(pdfDataUri, fileName);
        }
        i++;
    }
}

function getActivityByDate(date) {
    const yearsMap = {
        2017: 'Minis',
        2016: 'Minis',
        2015: 'Minis',
        2014: 'Petits',
        2013: 'Petits',
        2011: 'Grans',
        2012: 'Grans',
        2010: 'Trauet',
        2009: 'Trau',
        2008: 'Projecte Nou',
        2007: 'Projecte Menta',
        2006: 'Projecte Malva',
        2005: 'Projecte Taronja',
        2004: 'Projecte Rubí',
        2003: 'Projecte Indi',
        2002: 'Projecte Blanc',
    }
    const year = date.split('/')[2];
    return yearsMap[year];
}

function downloadPDF(pdf, name) {
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = name + ".pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
}

function wrap(s){
    const result = s.replace(
    /(?![^\n]{1,70}$)([^\n]{1,70})\s/g, '$1\n'
    );
    console.log(result);
    return result;
}