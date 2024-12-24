<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NASA API Demo</title>
</head>
<body>
  <h1>NASA API Demo</h1>
  <label for="date">Pilih Tanggal:</label>
  <input type="date" id="date" name="date">
  <button onclick="getNasaData()">Dapatkan Data</button>
  <div id="result"></div>

  <script src="app.js"></script>
</body>
</html>