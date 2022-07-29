<?php 
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods:POST,GET,PUT,DELETE');
header('Access-Control-Allow-Headers: content-type or other');
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "simple_app";

$conn = new mysqli ($servername, $username, $password ,$dbname);

if ($conn-> connect_errno){
    die("connection failed:" . $conn->connect_errno);
}


$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    //====add new register user====
    case "POST":
        if (isset($_POST['email_reg'])) {
            $sql = "INSERT INTO user_login_info (email,pwd) VALUES ('".$_POST['email_reg']."','".$_POST['password']."')";
            if(mysqli_query($conn,$sql)) {
                $data = array("data" => "Reg Success");
                echo json_encode($data);
            } else {
                $data = array("data" => "Error: " . $sql. "<br>" . $conn->error);
                echo json_encode($data);
            }
        }
        echo $_POST['password'];
        if (isset($_POST['email_login'])) {
            $sql = "SELECT * FROM `user_login_info` WHERE email = `".$_POST['email_login']."` ";
            if(mysqli_query($conn,$sql)) {
                $data = array("data" => "Login Success");
                echo json_encode($data);
            } else {
                $data = array("data" => "Error: " . $sql. "<br>" . $conn->error);
                echo json_encode($data);
            }
        }

        break;
        
}


die();
?>