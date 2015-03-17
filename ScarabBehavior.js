#pragma strict

var target : Transform;
var speed : float = 0.25;

function Start () {
}

function Update () {
	transform.position = Vector3.MoveTowards(transform.position, target.position, speed);
	transform.LookAt(target.position);
}
