function createAudioHTML(path) {
  return '<audio controls controlslist="nodownload" class="px-1"> <source src=' +
      path +
      ' type="audio/wav">Your browser does not support the audio element.</audio>';
}


function generateExampleRow(table_row, root_path, file_pre, file_ext, col_offset) {
  for (var i = 0; i < file_pre.length; i++) {
    let p = root_path + file_pre[i] + file_ext;
    let cell = table_row.cells[col_offset + i];
    if (p.endsWith('txt')) {
      var req = new XMLHttpRequest();
      req.open("GET", p, false);
      req.send(null);
      cell.innerHTML = '<font size="-1">' + req.responseText + '</font>';
    } else {
      cell.innerHTML = cell.innerHTML + createAudioHTML(p);
    }
  }
}

function generateVC(tableId, examples, base) {
  let table = document.getElementById(tableId);
  console.log("got table ", table);

  let models = [
          'sources/',
          'targets/',
          'ours_norm/',
          'ours_aligned/',
          'ours_phone/',
          'triaanvc/',
          'freevc/',
          'diffvc',
  ];
  
  for (var i = 0; i < examples.length; i++) {
    generateExampleRow(table.rows[i], base, models, examples[i], 0)
  }
}

let librispeech_examples = [
  '4446/2273/4446-2273-0023.flac',
  '61/70970/61-70970-0026.flac',
  '121/121726/121-121726-0001.flac',
  '1320/122617/1320-122617-0041.flac',
  '1995/1826/1995-1826-0020.flac',
  '4507/16021/4507-16021-0045.flac',
  '6930/75918/6930-75918-0006.flac',
  '7176/88083/7176-88083-0010.flac',
];

let vctk_examples = [
  'p277_293_mic2.flac',
  'p294_068_mic1.flac',
  'p227_015_mic2.flac',
  'p245_024_mic2.flac',
  'p316_034_mic1.flac',
  'p343_197_mic2.flac',
  'p330_017_mic2.flac',
  'p271_039_mic2.flac',
];

generateVC('librispeech-test-table', librispeech_examples, 'data/demo_librispeech/');
generateVC('vctk-test-table', vctk_examples, 'data/demo_vctk/');
