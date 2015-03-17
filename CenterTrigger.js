#pragma strict

var gui : MainGUI;

function Start () {

}

function Update () {

}


function OnTriggerEnter (theCollider : Collider) {
	if(theCollider.tag == "Enemy") {
		gui.EnemyMissed();
		Destroy(theCollider.gameObject);
	}
}