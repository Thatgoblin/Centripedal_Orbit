#pragma strict

var enemiesKilled : int = 0;
var enemiesMissed : int = 0;

function Start () {
}

function Update () {

}

function OnGUI () {
	//font
	//GUI.color = Color.black;

	// We'll make a box so you can see where the group is on-screen.
	//GUI.Label (new Rect (140,40,100,30), "" + enemiesKilled);
	//GUI.Label (new Rect (650,40,100,30), "" + enemiesMissed);
}

function EnemyKilled () {
	enemiesKilled++;
}

function EnemyMissed () {
	enemiesMissed++;
}