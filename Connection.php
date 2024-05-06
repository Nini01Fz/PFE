<?php
//Connexion à la base de données
try{
	$conn=new PDO('mysql:host=localhost; dbname=gamehub','root','');
}
catch(Exception $e)
{
	die('Erreur: '.$e->getMessage());
}	
?>