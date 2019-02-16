<html>
<body>

<p>Grid size: <?php echo $_POST["grid_size"]; ?></p><br>
Winning line of symbols: <?php echo $_POST["winline"]; ?>

<?php 
echo "<script src='https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.js'></script>
<script src='sketch.js'>let grid_size= ".$_POST['grid_size']."
let winline = ".$_POST['grid_size']."</script>
<script src='Tile.js'>
</script>"?>

</body>
</html>