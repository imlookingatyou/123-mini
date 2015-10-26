<?php

Class Game {
	
	public function getUserCoins($user=false) {
		if(!$user) {
			return false;
		}
		
		$db = db::appDbConnect();
		$sql = "SELECT coins FROM game_user WHERE userid = ? LIMIT 1";
		$values = array(intval($user));
		try {
			$result = $db->fetchOne($sql, $values);
			if($result) {
				return $result;
			}
		} catch (Exception $e) {
			var_dump($e);
			return false;
		}
	}
	
	public function addPlay($play=false) {
		if(!$play || !is_array($play)) {
			return false;
		}
		
		$valid = $this->validateGame($play);
		
		if(is_array($valid)) {
			return false;
		}
		
		$values = array(
			'userid' => intval($play['userid']),
			'coinsearned' => $play['coinsearned'],
			'time' => date('Y-m-d H:i:s', strtotime('now')),
			'level' => $play['level'],
			'finished' => $play['finished']
		);
		
		$db = db::appDbConnect();
		try {
			$db->insert('game_plays', $values);
		} catch(Exception $e) {
			return false;
		}
		
		$sql = "UPDATE game_user SET coins = coins + ?, totalearned = totalearned + ? WHERE userid = ? LIMIT 1";
		$values = array($values['coinsearned'], $values['coinsearned'], $values['userid']);
		try {
			$db->query($sql, $values);
			return true;
		} catch (Exception $e) {
			var_dump($e);
			return false;
		}
	}
	
	private function validateGame($play) {
		$errors = array();
		
		foreach($play as $key => $value) {
			switch($key) {
				case 'coinsearned':
					
					break;
				case 'level':
					break;
				case 'finished':
					break;
				case 'multiplier':
					break;
				case 'userid':
					break;
				default:
					$errors[] = "No key found - ".$key;
					break;
			}
		}
		
		if(empty($errors)) {
			return true;
		} else {
			return $errors;
		}
	}
	
	public function getMarketAccessories() {
		$db = db::appDbConnect();
		$sql = "SELECT * FROM accessories WHERE price > 0 ORDER BY price ASC";
		try {
			$res = $db->fetchAll($sql);
			if(count($res) > 0) {
				return $res;
			} else {
				return false;
			}
		} catch(Exception $e) {
			var_dump($e);
			return false;
		}
	}
	
	public function getUserAccessories($userid=false) {
		if(!$userid) {
			return array();
		}
		
		$db = db::appDbConnect();
		$sql = "SELECT accessoryid FROM user_accessories WHERE userid = ?";
		$values = array($userid);
		try {
			$res = $db->fetchAll($sql, $values);
			if(count($res) > 0) {
				$acc = array();
				foreach($res as $accessory) {
					$acc[] = $accessory['accessoryid'];
				}
				return $acc;
			} else {
				return array();
			}
		} catch (Exception $e) {
			var_dump($e);
			return false;
		}
	}
	
	public function buyItem($user=false, $accessory=false) {
		if(!$user || !$accessory) {
			return false;
		}
		
		$db = db::appDbConnect();
		$sql = "SELECT * FROM accessories WHERE id = ? LIMIT 1";
		$values = array($accessory);
		try {
			$acc = $db->fetchRow($sql, $values);
		} catch(Exception $e) {
			var_dump($e);
			return false;
		}
		
		$coins = $this->getUserCoins($user);
		
		if($coins >= $acc['price']) {
			$updateUser = $this->setUserCoins($user, $acc['price']);
			if(!$updateUser) {
				return false;
			} else {
				$values = array(
					'userid' => $user,
					'accessoryid' => $accessory
				);
				$db->insert('user_accessories', $values);
				if($acc['type'] == "key") {
					$sql = "UPDATE game_user SET level = level + 1 WHERE userid = ? LIMIT 1";
					$values = array($user);
					$db->query($sql, $values);
				}
				return array('success' => 1, 'type' => $acc['type'], 'coins' => ($coins - $acc['price']));
			}
		} else {
			return array('success' => 0, 'reason' => 'Not enough coins');
		}
	}
	
	private function setUserCoins($user=false, $coins=false) {
		if(!$user || !$coins) {
			return false;
		}
		
		$db = db::appDbConnect();
		$sql = "UPDATE game_user SET coins = coins - ?, totalspent = totalspent + ? WHERE userid = ? LIMIT 1";
		$values = array($coins, $coins, $user);
		try {
			$db->query($sql, $values);
			return true;
		} catch (Exception $e) {
			var_dump($e);
			return false;
		}
	}
	
	public function equipItem($user=false, $accessory=false) {
		if(!$user || !$accessory) {
			return false;
		}
		
		$db = db::appDbConnect();
		$sql = "UPDATE characters SET accessories = ? WHERE userID = ? LIMIT 1";
		$values = array($accessory, $user);
		try {
			$db->query($sql, $values);
			return true;
		} catch (Exception $e) {
			var_dump($e);
			return false;
		}
	}
}

?>