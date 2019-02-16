<html>
<body>

<p>Grid size: <?php echo $_GET["grid_size"]; ?></p><br>
Winning line of symbols: <?php echo $_GET["winline"]; ?>

<?php 
echo "<script src='https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.js'></script>
<script src='sketch.js'></script>
<script src='Tile.js'>
let grid_size= ".$_GET["grid_size"].
"let winline = ".$_GET["grid_size"]."
</script>"?>

</body>
</html>