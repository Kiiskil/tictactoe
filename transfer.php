<html>
<body>

<p>Grid size: <?php echo $_POST["grid_size"]; ?></p><br>
Winning line of symbols: <?php echo $_POST["winline"]; ?><br>

<script type="text/javascript">
let grid_size= "<?php echo $_POST["grid_size"]?>";
let winline = "<?php echo $_POST["winline"]?>";
</script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.js'></script>
<script src='sketch.js'></script>
<script src='Tile.js'></script>

</body>
</html>