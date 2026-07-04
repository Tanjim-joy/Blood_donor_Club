package models

import (
	"time"

	"gorm.io/gorm"
)

type Donor struct {
	gorm.Model
	Name         string     `json:"name" binding:"required"`
	Phone        string     `json:"phone" binding:"required"`
	Email        string     `json:"email"`
	BloodGroup   string     `json:"blood_group" binding:"required"`
	Age          int        `json:"age"`
	Gender       string     `json:"gender"`
	Area         string     `json:"area" binding:"required"`
	City         string     `json:"city"`
	LastDonation *time.Time `json:"last_donation"`
	Available    bool       `json:"available" gorm:"default:true"`
	Notes        string     `json:"notes"`
}
