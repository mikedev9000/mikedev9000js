<?php

$fields = array(
    'first_name',
    'last_name',
);

if( $_POST )
{
    
    $valid = true;
    
    foreach( $fields as $field )
        if( empty( $_POST[$field] ) )
            $valid = false;
    
    if( $valid )
    {
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
	<label for"<?php echo $field;?>"><?php echo $field;?></label><input type="text" name="<?php echo $field;?>"></input>
<?php endforeach;?>
	<input type="submit"/>
</form>