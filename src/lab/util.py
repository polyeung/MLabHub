


def school_to_dep(school):
    if not school:
        return []
    school_list = school.strip().split(",")
    mydict = {
        "lsa": ["MATH"],
        "eng": ["CSE", "ME", "BME"],
        "si": ["SI"],
    }
    res_list = []
    print(school_list)
    for school_key in school_list:
        if school_key in mydict:
            res_list += mydict[school_key]

    return res_list
