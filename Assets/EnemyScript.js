/**
 * 敵スクリプト。
 *
 * @author 2014/09/01 matsushima
 */

#pragma strict

var animator: Animator;

var STATE_IDLE: int = 0;
var STATE_WALK: int = 1;

var state: int = STATE_IDLE;

var stateTime: float;

var speed: float = 0;

var player: GameObject;

function Start () {
	animator = gameObject.GetComponent(Animator);
	stateTime = Time.time;
	/*for (var o: GameObject in GameObject.FindGameObjectsWithTag("Player")) {
		Debug.Log(o.name);
	}*/
	//player = GameObject.FindGameObjectWithTag("Player");
	player = GameObject.Find("unitychan_dynamic_locomotion");
}

function Update () {
	var timeNow: float = Time.time;
	switch (state) {
	case STATE_IDLE:
		if (timeNow - stateTime >= 5) {
			state = STATE_WALK;
			stateTime = timeNow;
		} else {
			speed = Mathf.Max(0, speed - Time.deltaTime);
		}
		break;
	case STATE_WALK:
		if (timeNow - stateTime >= 5) {
			state = STATE_IDLE;
			stateTime = timeNow;
		} else {
			speed = Mathf.Min(1, speed + Time.deltaTime);
		}
		break;
	}
	// 攻撃
	var distance: Vector3 = player.transform.position - transform.position;
	if (distance.magnitude <= 1.0f) {
		animator.SetTrigger("Attack");
	}
	// 移動
	animator.SetFloat("Speed", speed);
	if (speed > 0) {
		var direction: float = Mathf.Atan2(distance.x, distance.z);
		// プレイヤー方向に回転
		transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.Euler(0, direction * 180 / Mathf.PI, 0), Time.deltaTime);
		// プレイヤー方向に移動
		transform.position.x += Mathf.Sin(direction) * Time.deltaTime * speed;
		transform.position.z += Mathf.Cos(direction) * Time.deltaTime * speed;
	}
}

function OnCollisionEnter (collision: Collision) {
	MainScript.Log("enemy", collision.gameObject.name);
	if ("Attack" == collision.gameObject.name) {
		Damage();
	} else if ("Bullet(Clone)" == collision.gameObject.name) {
		Damage();
		Destroy(collision.gameObject);
	}
}

function Damage() {
	animator.SetTrigger("Damage");
	Destroy(gameObject, 0.5f);
}
