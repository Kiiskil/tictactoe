<html>
<body>

Grid size: <?php echo $_POST["grid_size"]; ?><br>
Winning line of symbols: <?php echo $_POST["winline"]; ?><br>
<div id="turn_screen"></div>
<script type="text/javascript">
let grid_size= "<?php echo $_POST["grid_size"]?>";
let winline = "<?php echo $_POST["winline"]?>";
</script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.js'></script>
<script src='https://github.com/CodingTrain/Toy-Neural-Network-JS/blob/master/lib/nn.js'></script>
<script src='https://github.com/CodingTrain/Toy-Neural-Network-JS/blob/master/lib/matrix.js'></script>
<script src='sketch.js'></script>
<script src='Tile.js'></script>


</body>
</html>