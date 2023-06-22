import { COLORS, FONT, SIZES } from "../../constants/theme";

const styles = {
    container: {
        margin: SIZES.medium,
        padding: SIZES.medium,
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.lightWhite,
    },
    text: {
        fontFamily: FONT.bold,
        fontSize: SIZES.medium,
    },
    input: {
        width: '100%',
        // height: 40,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        borderRadius: SIZES.xxSmall,
        marginBottom: SIZES.small,
        padding: SIZES.xSmall,
    },
    modalView: {
        marginVertical: 300,
        marginHorizontal: SIZES.xLarge,
        backgroundColor: COLORS.lightWhite,
        borderRadius: 5,
        elevation: 5,
    },
    tagsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: SIZES.xxSmall,
    },
    tagItem: {
        borderWidth: 1,
        borderColor: COLORS.link,
        backgroundColor: COLORS.primary,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        marginRight: 10,
    },
    tagText: {
        color: COLORS.lightWhite,
        fontFamily: FONT.regular,
    },
    tagAddButton: {
        width: 130,
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.xxSmall,
        marginBottom: SIZES.small,
        paddingVertical: SIZES.xSmall,
        alignSelf: "center",
    },
    tagAddButtonText: {
        textAlign: "center",
        fontFamily: FONT.medium,
        fontSize: SIZES.medium,
        color: COLORS.lightWhite,
    },
    updateButton: {
        flex: 1,
        borderWidth: 1,
        justifyContent: "center",
        alignSelf: "center",
        width: 150,
        paddingVertical: SIZES.xSmall,
        borderRadius: SIZES.xxSmall,
        borderColor: COLORS.link,
        margin: SIZES.xxSmall,
        backgroundColor: COLORS.primary,
    },
    updateText: {
        textAlign: "center",
        color: COLORS.lightWhite,
        fontFamily: FONT.medium,
        fontSize: SIZES.medium,
    },
}

export default styles;