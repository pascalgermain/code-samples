<?php

/**
 * @property integer $id
 * @property boolean $published
 * @property string $name
 * @property string $description
 * @property string $image
 * @property string $episodes
 */
class Guest extends Model
{
	public $uploadFields = array(
		'image' => 'guest',
	);

	public $episodeCount;

	public static function model($className = __CLASS__)
	{
		return parent::model($className);
	}

	public function tableName()
	{
		return 'guest';
	}

	public function rules()
	{
		return array(
			array('published, name', 'required'),
			array('published', 'boolean'),
			array('name, description, image, episodes', 'length', 'max' => 255),
			array('image', 'file', 'types' => 'jpg, jpeg, png, gif', 'maxSize' => 10485760, 'tooLarge' => Mii::t('error_too_large'), 'allowEmpty' => true),
			array('published, name, description, episodeCount', 'safe', 'on' => 'search'),
		);
	}

	public function attributeLabels()
	{
		return array(
			'published' => Mii::t('published'),
			'name' => Mii::t('name'),
			'description' => Mii::t('description'),
			'image' => Mii::t('image'),
			'episodes' => Mii::t('episodes'),
			'episodeCount' => Mii::t('episodes'),
		);
	}

	public function search()
	{
		$criteria = new CDbCriteria;

		$episodeCount = 'LENGTH(episodes) - LENGTH(REPLACE(episodes, "#", ""))';
		$criteria->select = "t.*, $episodeCount AS episodeCount";

		$criteria->compare('published', $this->published);
		$criteria->compare('name', $this->name, true);
		$criteria->compare('description', $this->description, true);
		$criteria->compare($episodeCount, $this->episodeCount);

		return new CActiveDataProvider(get_class($this), array(
			'criteria' => $criteria,
			'sort' => array(
				'defaultOrder' => 'published DESC, name',
				'attributes' => array(
					'*',
					'episodeCount' => array(
						'asc' => 'episodeCount ASC',
						'desc' => 'episodeCount DESC',
					),
				),
			),
			'pagination' => array('pageSize' => Yii::app()->params['pagination']),
		));
	}
}
