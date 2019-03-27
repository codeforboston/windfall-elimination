import mysql.connector

## Calculates AIME, which is needed to calculate benefits
## Returns: A number representing the user's AIME
def get_aime(mpb,dob,retire_date):
	pia = mpb/(get_benefit_reduction(dob,retire_date))
	bend_points = find_bend_points(dob)
	if pia > (bend_points[0] * .9 + (bend_points[1]-bend_points[0]) * .32):
		aime = bend_points[1] + (pia - (bend_points[0] * .9 + bend_points[1] * .32)) / .15
	elif pia > (bend_points[0] * .9):
		aime = bend_points[0] + (pia - (bend_points[0] * .9)) / .32
	else:
		aime = pia / .9
	return aime

## Calculates Social Security benefits of a person effected by WEP
## It may be prudent at some point to change this to calculate PIA,
## and apply early retirement later, in order to better work with the
## proposed "slider"
## Returns: A float, representing the user's Maximum Possible Benefit
def get_wep_mpb(aime,dob,retire_date,years_substantial_earnings):
	bend_points = find_bend_points(dob)
	wep_coeff = get_wep_coefficient(years_substantial_earnings)
	if aime > bend_points[1]:
		pia = wep_coeff*bend_points[0]+.32*(bend_points[1]-bend_points[0])\
		+.15*(aime-bend_points[1])
	elif aime > bend_points[0]:
		pia = wep_coeff*bend_points[0]+.32*(aime-bend_points[0])
	else:
		pia = wep_coeff*aime
	print pia
	mpb = pia*get_benefit_reduction(dob,retire_date)
	return mpb

## Accesses the bend points tables to find the "bend points" for a user's
## birth year.
## Parameters:
##  dob, a three-integer tuple representing day, month, and year of birth
## Returns:
##  A two-integer tuple, representing the bend points
def find_bend_points(dob):
	## SELECT bendpoint1, bendpoint2 FROM table_name WHERE year = dob.year
	#mydb = mysql.connector.connect(
  	#	host="localhost",
  	#	user="yourusername",
  	#	passwd="yourpassword",
  	#	database="mydatabase"
	#)

	#mycursor = mydb.cursor()

	#sql = "SELECT bendpoint1, bendpoint2 FROM table_name WHERE year = "\
	# + dob.year

	#mycursor.execute(sql)

	#bend_points = mycursor.fetchall()
	if dob[2] == 1956: bend_points = (895,5397) ##temporary dummy code for "Susan" example

	return bend_points

## Calculates the amount by which the user's benefit is reduced, if any,
##  based on retirement date
## Parameters:
##  dob, a three-integer tuple representing day, month, and year of birth
##  retire_date, a three-integer tuple representing day, month, and year the
##   user intends to retire
## Returns: A fractional number, which is the amount to which the
## 	user's PIA is reduced to produce MPB
def get_benefit_reduction(dob, retire_date):
	#mydb = mysql.connector.connect(
	#	host="localhost",
	#	user="yourusername",
	#	passwd="yourpassword",
	#	database="mydatabase"
	#	)

	#mycursor = mydb.cursor()

	#sql = "SELECT reduction FROM table_name WHERE month = " + str(retire_date[1]) +\
	#" AND year = " + str(retire_date[2])

	#mycursor.execute(sql)

	#reduction = mycursor.fetchall()
	if dob == (1,1,1956) and retire_date == (1,9,2018):
		reduction = .767 ##temporary dummy code for "Susan" example

	return reduction

## Calculates the new portion of the first "bin" of AIME that is convered to
##  PIA
## Parameters:
##  years_substantial_earnings, an integer representing the user's years of
##   substantial earnings under the WEP
## Returns: a fractional number, which is the new fraction used in the WEP
##  calculations of PIA
def get_wep_coefficient(years_substantial_earnings):
	yse = years_substantial_earnings ##For ease of typing, in the rest of the function

	## SU: this "hardcoded" approach is obviously not ideal
	wep_coeff = .4
	if yse <= 20: wep_coeff = .4
	if yse == 21: wep_coeff = .45
	if yse == 22: wep_coeff = .5
	if yse == 23: wep_coeff = .55
	if yse == 24: wep_coeff = .6
	if yse == 25: wep_coeff = .65
	if yse == 26: wep_coeff = .7
	if yse == 27: wep_coeff = .75
	if yse == 28: wep_coeff = .8
	if yse == 29: wep_coeff = .85
	if yse >= 30: wep_coeff = .9
	return wep_coeff
	


if __name__ == "__main__":
	to_print = get_wep_mpb(1225,(1,1,1956),(1,9,2018),25)
	print to_print


