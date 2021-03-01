<?php
//Archivo para llamada AJAX. 
$city = htmlspecialchars($_GET['ciudad']);
$type = htmlspecialchars($_GET['tipo']);
$price = htmlspecialchars($_GET['precio']);
$pos = strpos($price, ';');
$min = substr($price, 0, $pos);
$max = substr($price, $pos+1);
$file = fopen("data-1.json", "r") or die("No se puede abrir el archivo");
$json = fread($file, filesize('data-1.json'));
$data = json_decode($json, true);

//Filtros
$r = array();
foreach($data as $i){
    $p = $i['Precio'];
    $p = substr($p, strpos($p,'$')+1);
    $c = strpos($p,',');
    $p = substr($p,0,$c).substr($p,$c+1);
    if($p>=$min && $p<=$max){
        array_push($r, $i);
    }
}

$result = array();
if(!empty($city) && !empty($type)){
    foreach($r as $e){
        if($e['Ciudad']==$city && $e['Tipo']==$type){
            array_push($result, $e);
        }
    }
} elseif(!empty($city)){
    foreach($r as $e){
        if($e['Ciudad']==$city){
            array_push($result, $e);
        }
    }
} elseif(!empty($type)){
    foreach($r as $e){
        if($e['Tipo']==$type){
            array_push($result, $e);
        }
    }
} else {
    $result = $r;
}

$rjson = json_encode($result);
echo '{"result":"success", "message":"Resultados obtenidos exitosamente", "data":'.$rjson.'}';

fclose($file);
?>