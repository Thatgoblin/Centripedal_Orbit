#pragma strict

var gui : MainGUI;

function Start () {

}

function Update () {

}

function OnTriggerEnter (theCollider : Collider) {
	if(theCollider.tag == "Enemy") {
		Destroy(theCollider.gameObject);
		gui.EnemyKilled();
	}
}