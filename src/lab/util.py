


def school_to_dep(school):
    school = school.strip()
    if not school:
        return []
    mydict = {
        "Literature, Sci, and the Arts": ["MATH"],
        "Engineering": ["CSE", "ME", "BME"],
        "Information": ["SI"],
    }
    if school in mydict.keys():
        return mydict[school]
    else:
        return []
