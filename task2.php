<html>
<head>
<title>task2</title>
</head>
<body>
<table style="">
<caption>Info</caption>
<tr>
<th>ID</th>
<th>Name</th>
<th>Surname</th>
<th>Email</th>

</tr>
<?php
$conn = mysqli_connect("localhost", "root", "root", "test");
if ($conn->connect_error) { die("Connection failed: " . $conn->connect_error); }
$sql = "SELECT id, name, surname,email FROM test";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
while ($row = $result->fetch_assoc()) {
echo "<tr><td>" . $row["id"] . "</td><td>" . $row["name"] . "</td><td>"
. $row["surname"] . "</td><td>" . $row["email"] . "</td><td><p><button>Delete</button></td></tr>";
}
echo "</table>";
} else {
echo "0 results";
}
$conn->close();
?>

</table>

</body>

</html>
