<?php
header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json, charset=utf-8');
header('Access-Control-Allow-Methods: *');
// header ('Access-Control-Allow-Origin','http://localhost:4200',1 );
// // grab JSON data sent by Angular
$data = json_decode(file_get_contents('php://input'), true);

$email = $data['Email'];
$pass = $data['Password'];
$CustName = $data['CustName'];
$Mobile = $data['Mobile'];
$new_pass = $data['confirmPassword'];
//


if(!empty($new_pass)){
  $data = savePassword($new_pass,$email,$pass);
  echo json_encode($data);
}

if(!empty($_FILES['file'])){

$temp_name =  $_FILES['file']['tmp_name'];
$image = $_FILES['files']['name'];
$email_id = $_FILES['file']['name'];
$folder ="./uploads/";
$path = $folder . $image;
$data  =  move_uploaded_file( $temp_name, $path);


      $servername = "127.0.0.1";
			$username = "root";
			$password = "vns123";
			$db = "test";
			$port = "3306";
        try {

          $conn = new PDO("mysql:host=$servername;port=$port;dbname=$db", $username, $password);
          $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
          $query = "UPDATE test_users SET avatar = '$path' WHERE email = '$email_id'";
          $stmt = $conn->prepare($query);
          $stmt->execute();
          $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
        echo json_encode( $result);
        } catch (\Exception $e) {
          echo json_encode($e->getMessage());
        }

}




if(!empty($email) && !empty($pass)){
$data =   submitLogin($email,$pass);
echo json_encode($data);

}

if(!empty($CustName) && (!empty($Mobile))){
  $data = savePersonalInfo($CustName,$Mobile,$email);
  echo json_encode($data);

}

function submitLogin($email,$pass){

      $servername = "127.0.0.1";
			$username = "root";
			$password = "vns123";
			$db = "test";
			$port = "3306";
        try {

          $conn = new PDO("mysql:host=$servername;port=$port;dbname=$db", $username, $password);
          $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	   		$stmt1 = $conn->prepare("SELECT id FROM test.test_users where email='$email' and password = '$pass'");
			$stmt1->execute();
          $result1 = $stmt1->setFetchMode(PDO::FETCH_ASSOC);
          $result1 = $stmt1->fetchAll();
          if(empty($result1)){
            $stmt2 = $conn->prepare("SELECT * FROM test.test_users where email='$email'");
          $stmt2->execute();
              $result2 = $stmt2->setFetchMode(PDO::FETCH_ASSOC);
              $result2 = $stmt2->fetchAll();

          if(empty($result2)){
            $query = "INSERT INTO test_users (email,password)
            VALUES ('$email','$pass')";
            $stmt = $conn->prepare($query);
            $stmt->execute();
            $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
          }else{
            return 'one';
          }
      }else{
        return 2;
      }
        } catch (\Exception $e) {
          echo json_encode($e->getMessage());
        }
}
function savePersonalInfo($CustName,$Mobile,$email){
  $servername = "127.0.0.1";
  $username = "root";
  $password = "vns123";
  $db = "test";
  $port = "3306";
    try {

      $conn = new PDO("mysql:host=$servername;port=$port;dbname=$db", $username, $password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $query = "UPDATE test_users SET name = '$CustName', mobile = '$Mobile' WHERE email = '$email'";
      $stmt = $conn->prepare($query);
      $stmt->execute();
      $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
      return $result;

    } catch (\Exception $e) {
      echo json_encode($e->getMessage());
    }
}
function savePassword($new_pass,$email,$pass){
  $servername = "127.0.0.1";
  $username = "root";
  $password = "vns123";
  $db = "test";
  $port = "3306";
    try {
      $conn = new PDO("mysql:host=$servername;port=$port;dbname=$db", $username, $password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $query = "UPDATE test_users SET password = '$new_pass' WHERE email = '$email' and password = '$pass' ";
      $stmt = $conn->prepare($query);
      $stmt->execute();
      $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
      return $result;

    } catch (\Exception $e) {
      return 123;
    }
}
        ?>
