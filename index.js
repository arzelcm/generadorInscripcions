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
            console.log(inscriptions);
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

            const activityName = getActivityByDate(inscription[4]) || '';
            // Activitat
            firstPage.drawText(activityName, {
                x: 200,
                y: height - 127,
                size: 12
            })

            const completeName = inscription[2].replace('  ', ' ');
            const spaceIndex = completeName.indexOf(' ');
            const name = completeName.slice(0, spaceIndex);
            const surname = completeName.slice(spaceIndex + 1);
            // Cognoms
            firstPage.drawText(surname, {
                x: 200,
                y: height - 185,
                size: 11
            })

            // Nom
            firstPage.drawText(name || '', {
                x: 420,
                y: height - 185,
                size: 11
            })

            // Data Naixement
            firstPage.drawText(inscription[4] || '', {
                x: 200,
                y: height - 201,
                size: 10
            })

            // Adreça
            firstPage.drawText(inscription[5] || '', {
                x: 200,
                y: height - 217,
                size: 10
            })

            // Població
            firstPage.drawText(inscription[6] || '', {
                x: 200,
                y: height - 233,
                size: 10
            })

            // CP
            firstPage.drawText(inscription[7] || '', {
                x: 420,
                y: height - 233,
                size: 10
            })

            // Tel Contacte1
            firstPage.drawText(inscription[11] || '', {
                x: 200,
                y: height - 266,
                size: 10
            })

            // Nom Contacte1
            firstPage.drawText(inscription[8] || '', {
                x: 360,
                y: height - 266,
                size: 10
            })

            // Tel Contacte2
            firstPage.drawText(inscription[15] || '', {
                x: 200,
                y: height - 281,
                size: 10
            })

            // Nom Contacte2
            firstPage.drawText(inscription[13] || '', {
                x: 360,
                y: height - 281,
                size: 10
            })

            // Correu 1
            firstPage.drawText(inscription[10] || '', {
                x: 200,
                y: height - 311,
                size: 10
            })

            // Correu 2
            firstPage.drawText(inscription[14] || '', {
                x: 200,
                y: height - 326,
                size: 10
            })

            // Autorització imatge
            if (inscription[18] == 'Sí') {
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

            // Autorització tornar sol/a
            if (inscription[19] == 'Sí') {
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


            // Autorització medicaments
            if (inscription[20] == 'Sí') {
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


            // Pes
            firstPage.drawText('Pes: ' + inscription[21] + 'kg', {
                x: 430,
                y: height - 619,
                size: 7
            })

            /* PAGE 2 */
            const secondPage = pages[1];
            console.log(inscription);

            // Ha de seguir algun règim de salut?
            secondPage.drawText(inscription[26] || '', {
                x: 85,
                y: height - 110,
                size: 10
            })


            // És habil
            if (inscription[22] == 'Sí') {
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
            if (inscription[23] == 'Sí') {
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
            /*if (inscription[22] == 'Sí') {
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
            }*/


            // Es fatiga
            if (inscription[24] == 'Sí') {
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
            if (inscription[25] == 'Sí') {
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
            const wrapMalalt = wrap({text: inscription[27]})
            secondPage.drawText(wrapMalalt.text || '', {
                x: 85,
                y: height - 275,
                size: wrapMalalt.size,
                lineHeight: wrapMalalt.lineHeight
            })

            // alèrgia
            const wrapAlergia = wrap({text: inscription[28]})
            secondPage.drawText(wrapAlergia.text || '', {
                x: 85,
                y: height - 315,
                size: wrapAlergia.size,
                lineHeight: wrapAlergia.lineHeight
            })

            // malaltia
            const wrappedMalaltia = wrap({text: inscription[29]});
            secondPage.drawText(wrappedMalaltia.text || '', {
                x: 85,
                y: height - 355,
                size: wrappedMalaltia.size,
                lineHeight: wrappedMalaltia.lineHeight
            })

            // medicament
            const wrappedMedicament = wrap({text: inscription[31]});
            secondPage.drawText(wrappedMedicament.text || '', {
                x: 85,
                y: height - 400,
                size: wrappedMedicament.size,
                lineHeight: wrappedMedicament.lineHeight
            })

            // vacunes
            const wrappedVacunes = wrap({text: inscription[30]});
            secondPage.drawText(wrappedVacunes.text || '', {
                x: 85,
                y: height - 445,
                size: wrappedMedicament.size,
                lineHeight: wrappedMedicament.lineHeight
            })

            // impediments
            const wrappedImpediments = wrap({text: inscription[32]});
            secondPage.drawText(wrappedImpediments.text || '', {
                x: 85,
                y: height - 490,
                size: wrappedImpediments.size,
                lineHeight: wrappedImpediments.lineHeight
            })

            // observacions
            wrappedObservacions = wrap({text: inscription[33]})
            secondPage.drawText(wrappedObservacions.text || '', {
                x: 85,
                y: height - 565,
                size: wrappedObservacions.size,
                lineHeight: wrappedObservacions.lineHeight
            })

            // Link al drive targeta sanitària
            wrappedObservacions = wrap({
                text: inscription[34],
                maxHeight: 25,
                size: 8
            })
            secondPage.drawText(wrappedObservacions.text || '', {
                x: 85,
                y: 22,
                size: wrappedObservacions.size,
                lineHeight: wrappedObservacions.lineHeight
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
        2017: 'Colònies Minis',
        2016: 'Colònies Minis',
        2015: 'Colònies Minis',
        2014: 'Colònies Petits',
        2013: 'Colònies Petits',
        2011: 'Colònies Grans',
        2012: 'Colònies Grans',
        2010: 'Campaments Trauet',
        2009: 'Campaments Trau',
        2008: 'Ruta Projecte Carbó',
        2007: 'Ruta Projecte Menta',
        2006: 'Ruta Projecte Malva',
        2005: 'Ruta Projecte Taronja',
        2004: 'Colònies Projecte Rubí',
        2003: 'Colònies Projecte Indi',
        2002: 'Colònies Projecte Blanc',
        2001: 'Colònies Projecte Zinc',
        2000: 'Colònies Projecte Safir',
        1999: 'Colònies Projecte Coure',
        1998: 'Colònies Projecte Llima',
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

function wrap(opts) {
    if (!opts.hasOwnProperty('size')) opts.size = 11
    if (!opts.hasOwnProperty('lineHeight')) opts.lineHeight = 14
    if (!opts.hasOwnProperty('maxHeight')) opts.maxHeight = 20
    if (!opts.hasOwnProperty('maxWidth')) opts.maxWidth = 970

    const charsPerLine = Math.floor(opts.maxWidth / opts.size);
    const linesAmount = Math.ceil(opts.text.length / charsPerLine);

    if (linesAmount * opts.lineHeight <= opts.maxHeight) {
        console.count('wrappppppping' + opts.text);
        let newText = '';
        let startStrIndex = 0;
        for (let i = 1; i <= linesAmount; i++) {
            const strIndex = i * charsPerLine;
            newText += `${opts.text.slice(startStrIndex, strIndex)}\n`;
            startStrIndex = strIndex;
            
        }
        opts.text = newText;
        
    } else {
        opts.size--
        opts.lineHeight--
        opts = wrap(opts);
    }

    console.log(opts);
    return opts;
}