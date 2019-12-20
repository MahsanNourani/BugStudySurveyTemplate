<!DOCTYPE html>
<html>
<head>
	<title>test</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link href="assets/fonts/font-awesome/css/font-awesome.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
    <link href="assets/css/style.css" rel="stylesheet" />
</head>
<body>
	<div class="container vertical-align-center h-100">
		<div class="row">
            <p class="col-md-10 offset-md-1 rounded bg-success shadow mt-4 p-3 text-light font-weight-bold" style="font-size: 25px;">
                <?php
                $servername = "ict-prod-hosting06.mysql.osg.ufl.edu";
                $username = "indiecise";
                $password = "J#4AeBAt0TWxD0VNg20#";
                $dbname = "indiecise";
                $port = "3373";
                // Create connection
                $conn = mysqli_connect($servername, $username, $password, $dbname, $port);

                $_Reference= $_POST["response"]; //this is a json object
//                echo $_Reference;
                // Check connection
                if (!$conn) {
                    die("Connection failed: " . mysqli_connect_error());
                }
                $sql = "INSERT INTO Bugs (Bugscol) VALUES ($_Reference)";

                if ($conn->query($sql) === TRUE) {
                    echo "Your responses are submitted successfully. We appreciate your time. <br> You may leave this page now.";
                } else {
                    echo "Error: " . $sql . "<br>" . $conn->error;
                }

                $conn->close();
                ?>
            </p>
        </div>
    </div>

<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
<!-- Popper.JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script>
<!-- Bootstrap JS -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

</body>
</html>
