<?php 

session_start();

$_SESSION['people'] = isset( $_SESSION['people'] ) ? $_SESSION['people'] : array();

sleep( 1 );

?>
<ul>
<?php if( $_SESSION['people'] ):?>
<?php     foreach( $_SESSION['people'] as $person ):?>
<li><?php echo "First name: {$person['first_name']} - Last Name: {$person['last_name']}";?></li>
<?php     endforeach;?>
<?php else:?>
<li><b>No people entered yet! Get started.</b></li>
<?php endif;?>
</ul>
