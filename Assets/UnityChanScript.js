/**
 * ユニティちゃんスクリプト。
 *
 * @author 2014/08/31 matsushima
 */

#pragma strict

/** アニメーター */
var animator: Animator;
/** 攻撃時刻 */
var attackTime: float = 0;
/** 弾丸時刻 */
var bulletTime: float = 0;
/** 弾丸 */
var bullets: GameObject[] = new GameObject[2];
/** 弾丸 */
var bulletPrefab: GameObject;

function Start () {
	animator = gameObject.GetComponent(Animator); // アニメーター
	transform.Find("Attack").gameObject.SetActive(false); // 攻撃オブジェクト
}

function Update () {
	var currentTime: float = Time.time;
	// 攻撃
	if (Input.GetButtonDown ("Fire1")) {
		animator.SetTrigger("Attack");
		transform.Find("Attack").gameObject.SetActive(true);
		attackTime = currentTime;
	}
	// 攻撃終了
	if (Time.time >= attackTime + 1) {
		transform.Find("Attack").gameObject.SetActive(false);
	}
	// 弾丸発射
	MainScript.Log("cou", bullets.length);
	if (currentTime - bulletTime >= 0.1) {
		for (var i: int = 0; i < bullets.length; ++ i) {
			if (null == bullets[i]) {
				bullets[i] = Instantiate(bulletPrefab, transform.position + transform.forward + transform.right * 0.2, transform.rotation);
				bullets[i].rigidbody.velocity = transform.forward * 10;
				Destroy(bullets[i], 1);
				bulletTime = currentTime;
				break;
			}
		}
	}
}

function OnCollisionEnter (collision: Collision) {
	MainScript.Log("player", collision.gameObject.name);
	// 敵と衝突	
	if (collision.gameObject.CompareTag("Enemy")) {
		animator.SetTrigger("Damage");
	}
}
