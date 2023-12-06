function convertText(inputText) {

  const letterMap = {
    's': '[" "],',
    'x': '["W"],',
    '*': '["B"],',
    '.': '["G"],',
    '@': '["P"],',
  };

  // Split the input text into lines
  const lines = inputText.toLowerCase().split('\n');

  // Ensure there are exactly 16 rows
  const paddedLines = Array.from({ length: 16 }, (_, rowIndex) => {
    const line = lines[rowIndex] || ''; // Use an empty string if the input has fewer lines
    const lineElements = line.split('').map(letter => letterMap[letter] || '[" "],');
    
    // Ensure each line has at least 19 elements (pad with [" "] if necessary)
    while (lineElements.length < 19) {
      lineElements.push('[" "],');
    }

    return lineElements.slice(0, 19); // Trim to exactly 19 elements
  });

  // Join the converted lines into a single string with line breaks
  const convertedText = paddedLines.map(line => '[' + line.join('') + '],').join('\n');

  return convertedText;
}

function handleConversion() {
  // Get the input text from the textarea
  const inputText = document.getElementById('inputText').value;

  // Call the conversion function
  const convertedText = convertText(inputText);

  // Update the output textarea with the converted text
  document.getElementById('outputText').value = convertedText;
}

