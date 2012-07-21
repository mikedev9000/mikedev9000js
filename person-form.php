<?php

session_start();

$fields = array(
    'first_name',
    'last_name',
);

if( $_POST )
{
    sleep(2);
    
    $valid = true;
    
    foreach( $fields as $field )
        if( empty( $_POST[$field] ) )
            $valid = false;
    
            
    if( $valid )
    {
        $_SESSION['people'] = isset( $_SESSION['people'] ) ? $_SESSION['people'] : array();
        
        $_SESSION['people'][] = array(
            'first_name' => $_POST['first_name'],
            'last_name' => $_POST['last_name'],
        );
        
        header( "Location: /person-saved.php");
        exit();
    }
    else
    {
        header( "Location: /person-not-saved.php");
        exit();
    }
}
?>
<form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post">
<?php foreach( $fields as $field ):?>
	<label for"<?php echo $field;?>"><?php echo $field;?></label><br/>
	<input type="text" name="<?php echo $field;?>"></input><br/>
<?php endforeach;?>
	<input type="submit"/>
</form>