def calc_firstweekday(year, month, day=1):
    offset = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
    week = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
    after_feb = 1 if month > 2 else 0
    aux = year - 1700 - after_feb
    day_of_week = 5
    day_of_week += (aux + after_feb) * 365
    day_of_week += aux // 4 - aux // 100 + (aux - 100) // 400
    day_of_week += offset[month - 1] + (day - 1)
    day_of_week %= 7
    return day_of_week, week[day_of_week]

def print_month(year, month):
    months = dict(January=31, February=28, March=31, April=30, May=31, June=30, July=31, August=31, September=30,
                  October=31, November=30, December=31)
    month_number = dict(January=1, February=2, March=3, April=4, May=5, June=6, July=7, August=8, September=9,
                  October=10, November=11, December=12)
    header = f'{month} {year:}'
    month_str = f'{header:^20}\nMo Tu We Th Fr Sa Su\n'
    first_weekday, day_name = calc_firstweekday(year, month_number[month])
    i = first_weekday
    for day in range(months[month] + first_weekday):
        if i != 0:
            month_str += f'   '
            i -= 1
        else:
            if day % 7 == 0 and day != 0:
                month_str += '\n'
            month_str += f'{str(day+1-first_weekday):>2} '
    return month_str

print(print_month(2025, 'March'))