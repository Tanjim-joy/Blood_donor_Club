package models

import "gorm.io/gorm"

type BloodRequest struct {
	gorm.Model
	PatientName string `json:"patient_name" binding:"required"`
	BloodGroup  string `json:"blood_group" binding:"required"`
	Units       int    `json:"units" binding:"required"`
	Hospital    string `json:"hospital" binding:"required"`
	Contact     string `json:"contact" binding:"required"`
	Area        string `json:"area" binding:"required"`
	NeededBy    string `json:"needed_by"`
	Urgency     string `json:"urgency" gorm:"default:'normal'"` // normal | urgent | critical
	Status      string `json:"status" gorm:"default:'open'"`    // open | fulfilled | closed
	RequestedBy string `json:"requested_by"`
}
