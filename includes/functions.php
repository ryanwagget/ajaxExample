<?
// do the connection first, then write a query
$user = "root";
$pass = "root";
$host = "localhost";
$db = "a3_cooperInfo";

$conn = mysqli_connect($host, $user, $pass, $db);

if (!$conn) {
  echo 'sumpin done gone wrong, son';
  exit;
}

echo 'connected, yo!';
// 1. do a select for all of the car data
//
// $myQuery = "SELECT * FROM mainmodel";
// $result = mysqli_query($conn, $myQuery);
// $rows = array();
//
// while ($row = mysqli_fetch_assoc($result)) {
//   $rows[] = $row;
// };

// echo back just the result set first
//var_dump($rows);
//echo $rows;
//echo json_encode($rows); // create a JSON object from the result set

// then echo back the JSON encoded result => after we set up the AJAX call in our .js file
//echo json_encode($rows);

//echo 'connected!';
//
//2. WRITE ANOTHER QUERY AND TEST IT IN THE BROWSER
//talk about get supervariable
if (isset($_GET["carModel"])) { // check to see if a query parameter exists
  $car = $_GET["carModel"];

  // pass in the car variable using the location bar in the browser (?carModel=F56)
  $myQuery = "SELECT * FROM mainmodel WHERE model = '$car'";
  // send the query
  $result = mysqli_query($conn, $myQuery);
  // get the result
  $row = mysqli_fetch_assoc($result);
  // echo it back to whatever called it (the browser, to start)
  //var_dump($row);
  // and then encode it for the javascript AJAX call
  echo json_encode($row);
};
?>
