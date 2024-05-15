// TODO: Focus this window when every file is downloaded

let inscriptions;

window.onload = () => {
    setLinkToView();
    setEventListeners();
}

function setLinkToView() {
    document.getElementById('linkSpan').innerHTML =
        `<a href="${location.href}" target="_blank">${location.href}<a/>`;
}

async function setEventListeners() {
    const fileInput = document.getElementById('fileInput');
    const downloadButton = document.getElementById('downloadButton');
    const chooseFileButton = document.getElementById('chooseFileButton');
    const choosenFileLabel = document.getElementById('choosenFile');
    const firstRowColTitleCheck = document.getElementById('firstRowColTitleCheck');

    fileInput.addEventListener("change", () => {
        const reader = new FileReader();
        reader.onload = () => {
            inscriptions = getInscriptionsFromCSVData(reader.result, firstRowColTitleCheck.checked == true);
            console.log(inscriptions);

            choosenFileLabel.innerHTML = `<u>${fileInput.files[0].name}</u> (${inscriptions.length} inscripcions)`;
            choosenFileLabel.classList.add('visible');

            // downloadInscriptions();
        }
        // reader.readAsText(await fetch('assets/inscris.csv').then(r => r.blob()));
        reader.readAsText(fileInput.files[0]);
    })

    downloadButton.addEventListener('click', () => {
        try {
            downloadInscriptions();
        } catch (error) {
            alert('Hi ha hagut algun error i no s\'han pogut descarregar totes les inscripcions. Per seguretat, esborra-les totes i torna a provar-ho revisant que a l\'excel no hi hagi valors raros. També pots obrir a l\'arzel i dir-li que no sap programar.');
            console.error(error);
        }
    });

    chooseFileButton.addEventListener('click', () => {
        fileInput.click();
    });

    firstRowColTitleCheck.addEventListener('change', () => {
        fileInput.dispatchEvent(new Event('change'))
    })
}

async function downloadInscriptions() {
    try {
        let i = 0;
        for (const inscription of inscriptions) {
            const year_ = inscription[3].split('/')[2];
            if (true || year_ == 2011 || year_ == 2012 || year_ == 2010) {
                const existingPdfBytes = await fetch('assets/inscripcioSantJosep2023.pdf').then(res => res.arrayBuffer())

                const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes)

                const pages = pdfDoc.getPages()
                const firstPage = pages[0];
                const { width, height } = firstPage.getSize()

                const activityName = getActivityByDate(inscription[3]) || '';
                // Activitat
                firstPage.drawText(activityName, {
                    x: 177,
                    y: height - 115,
                    size: 12
                })

                const completeName = inscription[2].replace('  ', ' ');
                const spaceIndex = completeName.indexOf(' ');
                const name = completeName.slice(0, spaceIndex);
                const surname = completeName.slice(spaceIndex + 1);
                // Cognoms
                firstPage.drawText(surname, {
                    x: 177,
                    y: height - 166,
                    size: 11
                })

                // Nom
                firstPage.drawText(name || '', {
                    x: 422,
                    y: height - 166,
                    size: 11
                })

                // Data Naixement
                firstPage.drawText(inscription[3] || '', {
                    x: 177,
                    y: height - 193,
                    size: 10
                })

                // Adreça
                firstPage.drawText(inscription[4] || '', {
                    x: 177,
                    y: height - 219,
                    size: 10
                })

                // Població
                firstPage.drawText(inscription[5] || '', {
                    x: 177,
                    y: height - 244,
                    size: 10
                })

                // CP
                firstPage.drawText(inscription[6] || '', {
                    x: 422,
                    y: height - 244,
                    size: 10
                })

                // Tel Contacte1
                firstPage.drawText(inscription[10] || '', {
                    x: 177,
                    y: height - 296,
                    size: 10
                })

                // Nom Contacte1
                firstPage.drawText(inscription[7] || '', {
                    x: 360,
                    y: height - 296,
                    size: 10
                })

                // Tel Contacte2
                firstPage.drawText(inscription[14] || '', {
                    x: 177,
                    y: height - 321,
                    size: 10
                })

                // Nom Contacte2
                firstPage.drawText(inscription[12] || '', {
                    x: 360,
                    y: height - 321,
                    size: 10
                })

                // Correu 1
                firstPage.drawText(inscription[9] || '', {
                    x: 177,
                    y: height - 374,
                    size: 10
                })

                // Correu 2
                firstPage.drawText(inscription[13] || '', {
                    x: 177,
                    y: height - 400,
                    size: 10
                })

                // Autorització imatge
                if (inscription[18] == 'Sí') {
                    // ticksi
                    firstPage.drawText('x', {
                        x: width - 110.5,
                        y: height - 620,
                        size: 12
                    })
                } else {
                    // tickno
                    firstPage.drawText('x', {
                        x: width - 86.9,
                        y: height - 620,
                        size: 12
                    })
                }

                // Autorització tornar sol/a
                if (inscription[19] == 'Sí') {
                    // ticksi
                    firstPage.drawText('x', {
                        x: 307,
                        y: height - 639.5,
                        size: 12
                    })
                } else {
                    // tickno
                    firstPage.drawText('x', {
                        x: 329,
                        y: height - 639.5,
                        size: 12
                    })
                }


                // Autorització medicaments
                if (inscription[20] == 'Sí') {
                    // ticksi
                    firstPage.drawText('x', {
                        x: 326.5,
                        y: height - 673.5,
                        size: 12
                    })
                } else {
                    // tickno
                    firstPage.drawText('x', {
                        x: 350,
                        y: height - 673.5,
                        size: 12
                    })
                }


                // Pes
                firstPage.drawText(inscription[21], {
                    x: 120,
                    y: height - 687,
                    size: 10
                })

                // Protocols comi lila
                firstPage.drawText('x', {
                    x: 49,
                    y: height - 709,
                    size: 10
                })

                /* PAGE 2 */
                const secondPage = pages[1];
                console.log(inscription);


                // Ha de seguir algun règim de salut?
                const wrapRegim = wrap({ deb: 1, text: inscription[26] })
                secondPage.drawText(wrapRegim.text || '', {
                    x: 53,
                    y: height - 115,
                    size: wrapRegim.size,
                    lineHeight: wrapRegim.lineHeight
                })


                // És habil
                if (inscription[22] == 'Sí') {
                    // ticksi
                    secondPage.drawText('x', {
                        x: 106,
                        y: height - 166.5,
                        size: 12
                    })
                } else {
                    // tickno
                    secondPage.drawText('x', {
                        x: 130,
                        y: height - 166.5,
                        size: 12
                    })
                }


                // Sap nedar
                if (inscription[23] == 'Sí') {
                    // ticksi
                    secondPage.drawText('x', {
                        x: 116,
                        y: height - 191.5,
                        size: 12
                    })
                } else {
                    // tickno
                    secondPage.drawText('x', {
                        x: 140,
                        y: height - 191.5,
                        size: 12
                    })
                }


                // Es fatiga
                if (inscription[24] == 'Sí') {
                    // ticksi
                    secondPage.drawText('x', {
                        x: 153.2,
                        y: height - 216,
                        size: 12
                    })
                } else {
                    // tickno
                    secondPage.drawText('x', {
                        x: 177.2,
                        y: height - 216,
                        size: 12
                    })
                }

                // Es mareja
                if (inscription[25] == 'Sí') {
                    // ticksi
                    secondPage.drawText('x', {
                        x: 173.3,
                        y: height - 240.7,
                        size: 12
                    })
                } else {
                    // tickno
                    secondPage.drawText('x', {
                        x: 197.3,
                        y: height - 240.7,
                        size: 12
                    })
                }


                // es posa malalt?
                const wrapMalalt = wrap({ deb: 2, text: inscription[27] })
                secondPage.drawText(wrapMalalt.text || '', {
                    x: 53,
                    y: height - 285,
                    size: wrapMalalt.size,
                    lineHeight: wrapMalalt.lineHeight
                })

                // alèrgia
                const wrapAlergia = wrap({ deb: 3, text: inscription[28] })
                secondPage.drawText(wrapAlergia.text || '', {
                    x: 53,
                    y: height - 325,
                    size: wrapAlergia.size,
                    lineHeight: wrapAlergia.lineHeight
                })

                // malaltia
                const wrappedMalaltia = wrap({ deb: 4, text: inscription[29] });
                secondPage.drawText(wrappedMalaltia.text || '', {
                    x: 53,
                    y: height - 370,
                    size: wrappedMalaltia.size,
                    lineHeight: wrappedMalaltia.lineHeight
                })

                // vacunes
                const wrappedVacunes = wrap({ deb: 5, text: inscription[30], fallBackText: 'Sí' });
                secondPage.drawText(wrappedVacunes.text || '', {
                    x: 53,
                    y: height - 410,
                    size: wrappedVacunes.size,
                    lineHeight: wrappedVacunes.lineHeight
                })

                // medicament
                const wrappedMedicament = wrap({ deb: 6, text: inscription[31] });
                secondPage.drawText(wrappedMedicament.text || '', {
                    x: 53,
                    y: height - 455,
                    size: wrappedMedicament.size,
                    lineHeight: wrappedMedicament.lineHeight
                })

                // impediments
                const wrappedImpediments = wrap({ deb: 7, text: inscription[32] });
                secondPage.drawText(wrappedImpediments.text || '', {
                    x: 53,
                    y: height - 502,
                    size: wrappedImpediments.size,
                    lineHeight: wrappedImpediments.lineHeight
                })

                // observacions
                wrappedObservacions = wrap({ deb: 8, text: inscription[33] })
                secondPage.drawText(wrappedObservacions.text || '', {
                    x: 53,
                    y: height - 554,
                    size: wrappedObservacions.size,
                    lineHeight: wrappedObservacions.lineHeight
                })

                // Link al drive targeta sanitària
                wrappedObservacions = wrap({
                    deb: 9,
                    text: inscription[34],
                    maxHeight: 25,
                    size: 8
                })
                secondPage.drawText(wrappedObservacions.text || '', {
                    x: 48,
                    y: 22,
                    size: wrappedObservacions.size,
                    lineHeight: wrappedObservacions.lineHeight
                })

                const fileName = `${inscription[2].toLowerCase().trim()} ${activityName.toLowerCase()}`;
                const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: false });
                if (pdfDataUri) console.count('downloading'); console.log(fileName);
                downloadPDF(pdfDataUri, fileName);
            }
            i++;
        }
    } catch (error) {
        alert('Hi ha hagut algun error i no s\'han pogut descarregar totes les inscripcions. Per seguretat, esborra-les totes i torna a provar-ho revisant que a l\'excel no hi hagi valors raros. També pots obrir a l\'arzel i dir-li que no sap programar.');
        console.error(error);
    }
}

function getActivityByDate(date) {
    console.log('date:', date);
    const yearsMap = {
        2018: 'Colònies Minis 2024',
        2017: 'Colònies Minis 2024',
        2016: 'Colònies Minis 2024',
        2015: 'Colònies Petits 2024',
        2014: 'Colònies Petits 2024',
        2013: 'Colònies Grans 2024',
        2012: 'Colònies Grans 2024',
        2011: 'Campaments Trauet 2024',
        2010: 'Campaments Trau 2024',
        2009: 'Ruta Morat 2024',
        2008: 'Ruta Carbó 2024',
        2007: 'Ruta Menta 2024',
        2006: 'Ruta Malva 2024',
        2005: 'Colònies Taronja 2024',
        2004: 'Colònies Rubí 2023-2024',
        2003: 'Colònies Indi 2023-2024',
        2002: 'Colònies Blanc 2024',
        2001: 'Colònies Zinc 2023-2024',
        2000: 'Colònies Safir 2024',
        1999: 'Colònies Coure 2024',
        1998: 'Colònies Llima 2024',
        '': 'Casal Hivern 2023-2024'
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
    // setTimeout(() => {window.focus();}, 800);
}

function wrap(opts) {
    try {
        if (!opts.hasOwnProperty('size')) opts.size = 11
        if (!opts.hasOwnProperty('lineHeight')) opts.lineHeight = 14
        if (!opts.hasOwnProperty('maxHeight')) opts.maxHeight = 20
        if (!opts.hasOwnProperty('maxWidth')) opts.maxWidth = 1150
        if (!opts.hasOwnProperty('fallBackText')) opts.fallBackText = 'No'
        if (!opts.hasOwnProperty('text') || opts.text === '') opts.text = opts.fallBackText

        console.log(opts);
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
    } catch (error) {
        alert('Hi ha hagut algun error i no s\'han pogut descarregar totes les inscripcions. Per seguretat, esborra-les totes i torna a provar-ho revisant que a l\'excel no hi hagi valors raros. També pots obrir a l\'arzel i dir-li que no sap programar.');
        console.error(error);
    }

}