<?php

class AccountController extends CController
{
	public function actionLogin()
	{
		$model = new UserLoginForm;
		if (isset($_POST['UserLoginForm']))
		{
			$model->attributes = $_POST['UserLoginForm'];
			if ($model->validate())
			{
				$identity = new UserIdentity($model->email, $model->password);
				$identity->authenticate();

				if ($identity->errorCode == UserIdentity::ERROR_NONE)
				{
					$deviceCode = Yii::app()->request->getQuery('deviceCode');
					if ($deviceCode !== null)
					{
						$device = Device::Model->findByAttributes(array(
							'code' => $deviceCode,
						), array(
							'select' => 'id',
						));
						if ($device === null)
						{
							$device = new Device;
							$device->code = $deviceCode;
						}
						$device->userId = $user->id;
						$device->loggedIn = Mii::BOOLEAN_TRUE;
						$device->save();
						Yii::app()->end((string)Mii::BOOLEAN_TRUE);
					}
				}
			}
		}
	}

	public function actionLogout()
	{
		$deviceCode = Yii::app()->request->getQuery('deviceCode');
		if ($deviceCode !== null)
		{
			$device = Device::Model->findByAttributes(array(
				'code' => $deviceCode,
			), array(
				'select' => 'id',
			));
			if ($device !== null)
			{
				$device->loggedIn = Mii::BOOLEAN_FALSE;
				$device->save();
			}
		}
	}
}
