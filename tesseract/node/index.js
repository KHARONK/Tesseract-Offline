// import the createWorker function
// It is called to create a new tesseract worker which is a
//  Child Process in Node.js and a Web Worker in the 
//  browser (Tesseract.js also work in the browser).

const { createWorker } = require('tesseract.js');
const path = require('path');

const worker = createWorker({
  langPath: path.join(__dirname, '..', 'lang-data'), 
  logger: m => console.log(m),
});

(async () => {
  // A worker instance have several methods. The first we need to call is the load function. 
  // It loads core scripts and prepare tesseract worker for what’s coming next.
  await worker.load();

  // Then, we need to load the language of the text in our image. We can achieve it with loadLanguages method.
  //  I will download  a file with trained date for the language in it. In our example, it will be a file called 
  //  eng.traineddata. We can load more than one language using + character (ex: eng+fr).

  await worker.loadLanguage('eng');

  // Time to make our worker ready to do OCR tasks. We do it with the initialize method. 
  // It takes language we want to use as parameters. It can be a subset of the languages we loaded earlier.

  await worker.initialize('eng');
  const { data: { text } } = await worker.recognize(path.join(__dirname, '..', 'images', 'testocr.png'));

  // To call the function and print the result.
  // The text to be used in the comparison for the Dinosour info.
  console.log(text);
  await worker.terminate();
})();
