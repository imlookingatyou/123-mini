<?php

Class Calculator {
	
	public function signup($data=false) {
		if(!$data) {
			return false;
		}
		
		$date = date('Y-m-d H:i:s', strtotime('now'));
		
		$db = db::appDbConnect();
		$values['user'] = array(
			'name' => new Zend_Db_Expr($db->quoteInto("AES_ENCRYPT(?, '" . Config::get_mandatory('encrypt_salt') . "')", addslashes($data['name']))),
			'age' => $data['age'],
			'month' => $data['month'],
			'username' => new Zend_Db_Expr($db->quoteInto("AES_ENCRYPT(?, '" . Config::get_mandatory('encrypt_salt') . "')", $data['username'])),
			'password' => md5($data['password'].Config::get_optional('password_salt')),
			'date' => $date,
			'secret_question' => $data['question'],
			'secret_answer' => new Zend_Db_Expr($db->quoteInto("AES_ENCRYPT(?, '" . Config::get_mandatory('encrypt_salt') . "')", addslashes($data['answer']))),
		);		
		
		try {
			$db->insert('users', $values['user']);
			$userId = $db->lastInsertId();
		} catch(Exception $e) {
			var_dump($e);
			return false;
		}
		
		$values['character'] = array(
			'userID' => $userId,
			'gender' => $data['gender'],
			'hair' => $data['hair'],
			'skin' => $data['head'],
			'head' => $data['head'],
			'shoes' => $data['shoes'],
			'bottom' => $data['bottom'],
			'accessories' => (isset($data['accessories']) ? $data['accessories'] : 0)
		);
		
		try {
			$db->insert('characters', $values['character']);
		} catch(Exception $e) {
			var_dump($e);
			return false;
		}
		
		if(isset($data['goals'])) {
			self::updateGoals(array('userID' => $userId, 'goals' => $data['goals']));
		}
		
		$values['game'] = array(
			'userid' => $userId,
			'coins' => 0,
			'totalearned' => 0,
			'totalspent' => 0,
			'level' => 1
		);
		
		try {
			$db->insert('game_user', $values['game']);
		} catch(Exception $e) {
			var_dump($e);
			return false;
		}
		
		for($i=1; $i<=5; $i++) {
			$accessory = array(
				'accessoryid' => $i,
				'userid' => $userId
			);
			$db->insert('user_accessories', $accessory);
		}
		
		return intval($userId);
		
	}
	
	public function updateCharacter($data=false) {
		if(!$data) {
			return false;
		}
		
		$db = db::appDbConnect();
		try {
			$values = array();
			$count = 0;
			
			$sql = "UPDATE characters SET ";
			foreach($data as $field => $value) {
				if($field != 'userID' && $field != 'accessoryType') {
					if($count != 0) {
						$sql .= ", ";
					}
					$sql .= $field." = ?";
					$count++;
					$values[] = $value;
				}
			}
			$sql .= " WHERE userID = ? LIMIT 1";
			$values[] = $data['userID'];
			$db->query($sql, $values);
			return true;
		} catch(Exception $e) {
			//var_dump($e);
			return false;
		}
	}
	
	public function getGoals($user=false) {
		if(!$user) {
			return false;
		}
		
		$db = db::appDbConnect();
		try {
			$sql = "SELECT * FROM goals WHERE userID = ? ORDER BY id ASC";
			$goals = $db->fetchAll($sql, array($user));
			
			return $goals;
		} catch(Exception $e) {
			var_dump($e);
			return false;
		}
		
	}
	
	public function updateGoals($data=false) {
		if(!$data) {
			return false;
		}
		
		$db = db::appDbConnect();
		$values['goals'] = $data['goals'];
		foreach($data['goals'] as $key => $goal) {
			if($goal == "false") {
				unset($values['goals'][$key]);
			} else {
				$values['goals'][$key]['userID'] = $data['userID'];
			}
			
			unset($values['goals'][$key]['goal']);
		}
		
		try {
			$sql = "DELETE FROM goals WHERE userID = ?";
			$db->query($sql, array($data['userID']));
						
			foreach($values['goals'] as $goal) {
				$db->insert('goals', $goal);
			}
			return true;
		} catch(Exception $e) {
			var_dump($e);
			return false;
		}
	}
	
	public function updateSavings($data=false) {
		if(!$data) {
			return false;
		}
		
		$db = db::appDbConnect();
		try {
			$sql = "DELETE FROM savings WHERE userID = ?";
			$db->query($sql, array($data['userID']));
			$db->insert('savings', $data);
			return true;
		} catch(Exception $e) {
			var_dump($e);
			return false;
		}
	}
	
	public function login($data=false) {
		if(!$data) {
			return false;
		}
		
		$db = db::appDbConnect();
		try {
			$sql = sprintf("SELECT u.id, AES_DECRYPT(u.name, '%s') AS name, u.age, u.month, c.gender, c.hair, c.head, c.shoes, c.bottom, c.skin, c.accessories FROM users u JOIN characters c ON u.id = c.userID WHERE u.username = AES_ENCRYPT(?, '%s') AND u.password = ? LIMIT 1", Config::get_mandatory('encrypt_salt'), Config::get_mandatory('encrypt_salt'));
			$values = array($data['username'], md5($data['password'].Config::get_optional('password_salt')));
			$user = $db->fetchRow($sql, $values);
			if(!$user) {
				return array('error' => 1);
			} else {
				//User found, get user goals and return data
				$sql = "SELECT id, name, cost, icon FROM goals WHERE userID = ? ORDER BY id ASC";
				$values = array($user['id']);
				$goals = $db->fetchAll($sql, $values);
				$user['goals'] = $goals;
				
				$sql = "SELECT savings, weekly, monthly, yearly FROM savings WHERE userID = ? LIMIT 1";
				$savings = $db->fetchRow($sql, $values);
				if($savings != false) {
					$user = array_merge($user, $savings);
				}
				
				$sql = "SELECT coins, level FROM game_user WHERE userid = ? LIMIT 1";
				$game = $db->fetchRow($sql, $values);
				if($game != false) {
					$user = array_merge($user, $game);
				} else {
					$values = array(
						'userid' => $user['id'],
						'coins' => 0,
						'totalearned' => 0,
						'totalspent' => 0,
						'level' => 1
					);
					
					$db->insert('game_user', $values);
					$user['coins'] = 0;
					$user['level'] = 1;
					
					for($i=1; $i<=5; $i++) {
						$accessory = array(
							'accessoryid' => $i,
							'userid' => $user['id']
						);
						
						$db->insert('user_accessories', $accessory);
					}
				}
				
				$sql = "SELECT accessoryType FROM accessories WHERE id = ? LIMIT 1";
				$values = array($user['accessories']);
				$accessoryType = $db->fetchOne($sql, $values);
				if($accessoryType != false) {
					$user['accessoryType'] = $accessoryType;
				} else {
					$user['accessoryType'] = "";
				}
				
				return $user;
			}
		} catch(Exception $e) {
			var_dump($e);
			exit;
		}
		
	}
	
	public function userCheck($username=false) {
		if(!$username) {
			return true;
		}
		
		$db = db::appDbConnect();
		try {
			$sql = sprintf("SELECT * FROM users WHERE username = AES_ENCRYPT(?, '%s') LIMIT 1", Config::get_mandatory('encrypt_salt'));
			$res = $db->fetchAll($sql, array($username));
			
			if(count($res) > 0) {
				return true;
			} else {
				return false;
			}
		} catch(Exception $e) {
			var_dump($e);
			return true;
		}
	}
	
	public function getSecretQuestion($username=false) {
		if(!$username) {
			return false;
		}
		
		$db = db::appDbConnect();
		try {
			$sql = sprintf("SELECT id, secret_question, AES_DECRYPT(secret_answer, '%s') AS answer FROM users WHERE username = AES_ENCRYPT(?, '%s') LIMIT 1", Config::get_mandatory('encrypt_salt'), Config::get_mandatory('encrypt_salt'));
			$res = $db->fetchRow($sql, array($username));
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
	
	public function resetPassword($id=false, $password=false) {
		if(!$id || !$password) {
			return false;
		}
		
		$db = db::appDbConnect();
		try {
			$password = md5($password.Config::get_optional('password_salt'));
			$sql = "UPDATE users SET password = ? WHERE id = ? LIMIT 1";
			$values = array($password, $id);
			$db->query($sql, $values);
			return true;
		} catch(Exception $e) {
			var_dump($e);
			return false;
		}
	}
	
	public function getAccessories($user=0) {
		$db = db::appDbConnect();
		if($user['id'] == 0) {
			$sql = "SELECT * FROM accessories WHERE price = 0";
			$values = array();
		} else {
			$sql = "SELECT a.id, a.name, a.path, a.filename, a.price, a.accessoryType, a.keyrequired, a.type FROM accessories a JOIN user_accessories ua ON a.id = ua.accessoryid WHERE ua.userid = ? && a.type = 'accessory' ORDER BY a.id ASC";
			$values = array($user);
		}
		
		try {
			$result = $db->fetchAll($sql, $values);
			if(count($result) > 0) {
				return $result;
			} else {
				return array();
			}
		} catch (Exception $e) {
			var_dump($e);
			return array();
		}
		
	}
	
}

?>